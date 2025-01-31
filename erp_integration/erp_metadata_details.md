---
permalink: /erp-metadata-details
title: ERP Integration Metadata Developer Guide
layout: default
section_title: ERP Integration

---

[Skip to view full metadata example.](#example---full-metadata)

Below is the general structure of an integration's metadata.
In the metadata, the root key **settings** contains two subkeys: **labels** and **entities**
```
"settings": {
  "labels": {...},
  "configurations": {
    "features": {...}
  },
  "entities": {
    "entity_name": {
      "enabled": true,
      "configs": {...},
      "tab": {...}
      "rules": {...}
    }
  }
}
```

### Labels

The **labels** section allows the integrator to set an integration's naming information.

```
  "labels": {
    "name": "ERP Integration",
    "id_name": "erp_integration_id",
    "short_name": "erp_integration_nickname"
  }
```

#### Field Descriptions:

- **name** - Used in various areas in the ERP tool to display ERP integration name (i.e. Sage 300).
- **id_name** - This is used as a prefix for the code field (i.e. Sage ID).
- **short_name** - This is a shorter version of the `name` field above that is used in various areas in the ERP tool (i.e. Sage).

### Configurations
Within the `configurations` section, the integrator can set various features for the integration. If you are not enabling the configuration, you do not need to include it in the metadata.

```
"configurations": {
  "features": {
    "custom_wbs_segments":  {
        "enabled": false
    }
  }
}
```
#### custom_wbs_segments
When enabled, users will be able to create custom WBS segment types as well as segment items that belong to the custom segment.

### Entities

Procore currently supports the following entities:

- standard_cost_codes
- standard_categories
- vendors
- jobs
- sub_jobs
- budgets
- job_costs
- job_cost_transactions
- commitments
- commitment_change_orders
- requisitions
- payment_applications
- prime_contracts
- prime_contract_change_orders

For each entity, Procore groups metadata configurations into three categories: **configs**, **tab**, and **rules**.
The following sections explain each of these categories in order, using the **vendor** entity as an example.

### Entity Configs

Procore allows integrators to create and update vendors through the export and import actions.
These actions can be enabled or disabled using the following metadata block.

```
"settings": {
  "entities": {
    "vendors": {
      "configs": {
        "export": {
          "enabled": true,
          "create": {
            "enabled": true
          },
          "update": {
            "enabled": false
          }
        },
        "import": {
          "enabled": true
        }
      }
    }
  }
}
```

For example, if an integrator wants to export a new vendor from Procore to the integration's accounting system, both the **export** and **create** configs must be enabled.
On the other hand, if the integrator tries to export from Procore and the vendor has **previously been exported** to the accounting system, then the **update** config must be enabled for Procore to update the already-exported vendor.
Currently, the ERP tool does not allow re-exporting a synced vendor.
In addition, if an integrator has the **export** action enabled for an entity, the integrator can specify additional information for Procore to send in the export payload for that entity, using **custom_fields**.

One example of a custom field is provided below.


```
"export": {
  "enabled": true,
    "custom_fields": [
      {
        "key": "transaction_date",
        "label": "Transaction Date",
        "type": "date",
        "rules": {
        "validation": {
          "present": {
            "enabled": true,
            "message": "Please choose a date"
          }
        }
      }
    }
  ]
}
```

In this case, the integrator has included a custom field that will send a transaction date when this entity is exported from Procore.
Note that a validation rule has been provided to enforce the presence of that transaction date, as well as to specify an error message if the date is absent.
The same validation rules (described in more detail below) apply to custom fields as other fields.

### Tab

Integrators can customize the appearance of the **Ready to Import** tab for each entity in Procore, adding columns for additional information.
For example, an integrator could add a "Code" column, as demonstrated below.

```
"tab": {
  "enabled": true,
  "columns": {
    "code": {
      "enabled": true,
      "text": "Code"
    }
  }
}
```

### Rules

The rules section allows the integrator to set validations for actions like **export** and **save**.
A **save** validation is executed when an entity is being created or updated in Procore.
An **export** validation is executed in the ERP tab during export.

```
"rules": {
  [export, save]: {
    "fields": {
      [type, code, address, city, name, business_phone, fax_number, zip, state_code]: {
        "enabled": true,
        "validation": {
          [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
            "enabled": true,
            "length": 50,
            "message": "validation_message"
          }
        }
      }
    }
  }
}
```

#### Supported Fields: (Any field found in the entity's API endpoint)

- Vendor - name, code, address, city, state_code, zip, country_code, business_phone, mobile_phone, email_address, fax_number (please view the Vendors API to see available fields
- Project - name, code, project_number, description, public_notes, address, city, state_code, zip, country_code, phone, estimated_start_date, estimated_completion_date, completion_date, time_zone, square_feet (please view the Projects API to see available fields)
- Sub Job - etc... (Please view the Sub Jobs API to see available fields)

#### Validation Types:

- max_length - requires the field to be no longer than the specified length
- max_length_decimal - requires that a decimal value have only up to the specified number of decimal places
- max_length_units - requires that a decimal value have only up to the specified number of digits before the decimal point
- max_line_length - given a collection of lines, makes sure each line is no longer than the specified length
- numeric - requires the field to contain numeric data
- positive - given a numeric field, requires the field to be positive
- present - requires the field to be present; specifies an error message if the field is absent

#### Validation Type Examples:

```
"max_length": {
  "enabled": true,
  "length": 50,
  "message": "Address is too long. Maximum %{length} characters."
}

"max_length_decimal": {
  "enabled": true,
  "length": 4,
  "message": "Decimal value is too long"
}

"max_length_units": {
  "enabled": true,
  "length": 8,
  "message": "Value is too long"
}

"max_line_length": {
  "enabled": true,
  "length": 30,
  "message": "Description is too long"
}

"numeric": {
  "enabled": true,
  "message": "Value entered is not numeric"
}

"positive": {
  "enabled": true,
  "message": "Value entered has to be a postive numeric value"
}

"present": {
  "enabled": true,
  "message": "Must provide a value"
}
```

Note: The **%{length}** denotes interpolation.
When the integrator specifies a maximum length for the validation, Procore will interpolate this value into the validation's error message.
Every validation rule allows for the **message** property to designate an error message to display to the user when validation fails

### Example Rules Metadata with Validation:

If an accounting software only allows addresses of 50 characters or less in length.
Using the rules and validations section of the metadata, an integrator can ensure that Procore validates the address before exporting to the accounting software.

```
"rules": {
  "export": {
    "fields": {
      "address": {
        "enabled": true,
        "validation": {
          "max_length": {
            "enabled": true,
            "length": 50,
            "message": "Address is too long. Maximum %{length} characters."
          }
        }
      }
    }
  }
}
```

## Vendor Metadata Structure:

Now that we have a better understanding of the **enabled**, **configs**, **tab**, and **rules** properties, we can combine all this information about metadata into the example **vendor** metadata structure shown below.

```
"vendors": {
  "enabled": true,
  "configs": {
    [export, import]: {
      "enabled": true
      [create, update]: {
        "enabled": true
      }
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
      "enabled": true,
        "text": "code"
      }
    }
  },
  "rules": {
    [export, save]: {
      "fields": {
        [name, code, address, city, state_code, zip, country_code, business_phone, mobile_phone, email_address, fax_number]: {
        "enabled": true,
        "validation": {
          [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
            "enabled": true,
            "message": "validation_message",
            "length": 50
          }
        }
      }
    }
  }
}
```

## Job Metadata Structure

Now that we have a better understanding of the **enabled**, **configs**, **tab**, and **rules** properties, we can combine all this information about metadata into the example **job** metadata structure shown below.

```
"jobs": {
  "enabled": true,
  "configs": {
    [export, import]: {
      "enabled": true
      [create, update]: {
        "enabled": true
      }
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
        "enabled": true,
        "text": "Job ID"
      }
    }
  },
  "rules": {
    [export, save]: {
      "fields": {
        [name, code, project_number, description, public_notes, address, city, state_code, zip, country_code,
        phone, estimated_start_date, estimated_completion_date, completion_date, time_zone, square_feet]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": true,
              "message": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
}
```

## Sub Job Metadata Structure

Similar to the Job's metadata structure:

```
"sub_jobs": {
  "enabled": true,
  "configs": {
    [export, import]: {
      "enabled": true
      [create, update]: {
        "enabled": true
      }
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
        "enabled": true,
        "text": "Code"
      }
    }
  },
  "rules": {
    [export, save]: {
      "fields": {
        [name, code]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": true,
              "message": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
}
```

## Budget Metadata Structure

The Budget metadata contains some custom configuration that are described below.

- forecast_amounts - This indicates whether you want the option to include forecast amounts in the export payload. Once this is enabled, users can then choose whether they want to include forecast amounts in the export payload through a configuration settings on the Budget. https://hackmd.procore.com/TtzDc5L3SkGhvNImrgJMOw
- sub_job_export - This config gets validated whenever you attempt to send a budget to the ERP Tab. If this config is enabled and the Budget has Budget Line Items related to a sub job, then it **can** be sent to the ERP Tab for export. If this config is disabled and the Budget has Budget Line Items related to a sub job, then it **cannot** be sent to the ERP Tab for export.
- revised_estimates_export - If this is enabled, any Revised Estimate Transactions will be included in the export payload. This config also controls whether a Budget can be sent to the ERP Tab. If this config is enabled and there are any unsynced Revised Estimates to export then the Budget **can** get sent to the ERP Tab for export. If this config is disabled and there are unsynced Revised Estimates to export then the Budget **cannot** be sent to the ERP Tab for export.

```
"budgets": {
  "enabled": true,
  "configs": {
    "export": {
      "enabled": true,
      "create": {
        "enabled": true,
      },
      "forecast_amounts": {
        "enabled": false
      }
    },
    "import": {
      "enabled": true
    },
    "sub_job_export": {
      "enabled": true
    },
    "revised_estimates_export": {
      "enabled": true
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
        "enabled": true,
        "text": "Sage 300 Budget Code"
      }
    }
  },
  "rules": {
    "export": {
      "warning_message": {
        "enabled": true,
        "message": "Caution: Once this budget has been exported, it can no longer be imported."
      },
      "fields": {
        "code": {
          "enabled": false
        }
      }
    }
  }
}
```

## Commitment Metadata Structure

The Commitment metadata contains some custom configurations that are described below.

Procore supports 2 types of Commitment Contracts: Purchase Order Contracts and Subcontracts:

- export_purchase_orders - Enabling this configuration allows Procore Purchase Order Contracts to be exported to the ERP System.
- export_subcontracts - Enabling this configuration allows Procore Subcontracts to be exported to the ERP System.

Other Configurations

- unlink - This configuration allows a user to unlink a synced commitment in the ERP Commitment tab. When a commitment is unlinked a Webhook event including the commitment being unlinked is delivered to the ERP Integration. The ERP Integration can choose to perform any cleanup related to the unlinked commitment.
- allow_duplicate_codes - When exporting a Commitment you will be required to enter a code. If a commitment with this code already exists, a validation error will occur unless this metadata configuration is enabled.
- procore_contract_number
    - When exporting a commitment contract, an # (number) field is sometimes required. If this setting is enabled, a new checkbox will appear in the ERP Integrations Settings page in Procore. Enabling the checkbox that appears will automatically populate the Procore contract # (number) to the `:number` field when exporting commitments from the ERP tab to the ERP System.
    - The number in this field will still be editable. If this box is unchecked, manual entry of a commitment number will be required.

```
"commitments": {
  "enabled": true,
  "configs": {
    "export": {
      "enabled": true
    },
    "import": {
      "enabled": false
    },
    "procore_contract_number": {
      "enabled": true
    },
    "unlink": {
      "enabled": true
    },
    "export_purchase_orders": {
      "enabled": true
    },
    "export_subcontracts": {
      "enabled": true
    },
    "allow_duplicate_codes": {
      "enabled": true
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
        "enabled": true,
        "text": "ERP System ID"
      }
    }
  },
  "rules": {
    [export, save]: {
      "fields": {
        [name, code]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": true,
              "message": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
},
"commitment_items": {
  "enabled": true,
  "configs": {
    "export": {
      "enabled": true
    },
    "import": {
      "enabled": false
    }
  },
  "tab": {
    "enabled": true
  },
  "rules": {
    [export, save]: {
      "fields": {
        [quantity, total_amount, unit_cost, cost_code, line_item_type, uom, description]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": true,
              "length": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
}
```

## Commitment Change Order Metadata

The Commitment Change Order metadata contains some custom configurations that are described below.

- line_items_require_single_category - Each of a commitment change order's line items will be associated with a particular line item type. When this setting is enabled, all the line items for a given change order will need to have the same line item type. If multiple line item types are present, a validation error will occur and you will not be able to send the change order to the ERP system.
- procore_change_order_number
    - When exporting a commitment change order, a # (number) field is sometimes required. If this setting is enabled, a new checkbox will appear in the ERP Integrations Settings page in Procore. Enabling the checkbox that appears will automatically populate the Procore change order # (number) to the `:number` field when exporting commitment change orders from the ERP tab to the ERP System.
    - The number in this field will still be editable. If this box is unchecked, manual entry of a commitment change order number will be required.
- unlink - This configuration allows a user to unlink a synced commitment change order in the ERP Commitment Change Order tab. When a change order is unlinked a Webhook event including the change order being unlinked is delivered to the ERP Integration. The ERP Integration can choose to perform any cleanup related to the unlinked change order.

```
"commitment_change_orders": {
  "enabled": true,
  "configs": {
    "export": {
      "enabled": true,
    },
    "import": {
      "enabled": false
    },
    "unlink": {
      "enabled": true
    },
    "procore_change_order_number": {
      "enabled": true
    },
    "line_items_require_single_category": {
      "enabled": false
    }
  },
  "tab": {
    "enabled": true,
    "columns": {
      "code": {
        "enabled": true,
        "text": "ERP System ID"
      }
    }
  },
  "rules": {
    [export, save]: {
      "fields": {
        [name, code, title, number]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": false,
              "message": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
},
"commitment_change_order_items": {
  "enabled": true,
  "configs": {
    "export": {
      "enabled": true
    },
    "import": {
      "enabled": false
    }
  },
  "tab": {
    "enabled": true
  },
  "rules": {
    [export, save]: {
      "fields": {
        [quantity, total_amount, unit_cost, cost_code, uom, description]: {
          "enabled": true,
          "validation": {
            [present, numeric, max_length, max_length_decimal, max_line_length, max_length_units, positive]: {
              "enabled": true,
              "length": "validation_message",
              "length": 50
            }
          }
        }
      }
    }
  }
}
```

## Job Cost Transactions Metadata

The Job Cost Transactions metadata does not contain any custom configurations, **although** the import configuration has slightly different behavior than other entity import configurations.
**import**: This indicates whether the integration simply **supports** importing Job Cost Transactions into Procore.
When enabled, customers will see a new configuration in Procore on each ERP Integrated Project's Admin settings to specify whether they want that particuar Project to import Job Cost Transactions or not.
Only when this metadata import configuration is enabled and the ERP synced Procore Project has specified it wants job cost transactions imported should the integration import Job Cost Transactions into Procore.

```
"job_cost_transactions": {
  "enabled"=>true,
  "tab": {
    "enabled": false
  },
  "configs": {
    "import": {
      "enabled": true
    }
  }
}
```


## Contract Payments Metadata
Currently we use **sync_payments** section in requisitions for importing payments. 
We will deprecate it and use the import here soon.

```
"contract_payments": {
  "enabled": true,
  "tab": {
    "enabled": true
  },
  "configs": {
    "export": {
      "enabled": true
    },
    "import": {
      "enabled": true,
      "minimum_sync_version": "0"
    }
  }
}
```

## Payment Application Metadata

The Payment Application metadata does not contain any custom configurations. Payment Applications can currently only be exported and unlinked.

```
"payment_applications": {
  "enabled": false,
  "configs": {
    "export": {
      "enabled": false
    },
    "unlink": {
      "enabled": false
    }
  },
  "tab": {
    "enabled": false
  },
  "rules": {
    "export": {
      "warning_message": {
        "enabled": false,
        "message": ""
      },
      "fields": {}
    },
    "save": {
      "fields": {}
    }
  }
}
```

## Example - Full Metadata

```
{
  "settings": {
    "labels": {
      "name": "ERP Integration",
      "id_name": "erp_integration_id",
      "short_name": "erp_integration_nickname"
    },
    "configurations": {
      "settings": {
        "cost_codes_segment_delimiter": "-"
      }
    },
    "entities": {
      "vendors": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": true,
            "create": {
              "enabled": true
            },
            "update": {
              "enabled": true
            }
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "Code"
            }
          }
        },
        "rules": {
          "export": {
            "fields": {
              "code": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Code can't be blank."
                  }
                }
              }
            }
          },
          "save": {
            "fields": {
              "address": {
                "validation": {
                  "max_line_length": {
                    "enabled": true,
                    "length": 50,
                    "message": "Address is too long. Maximum %{length}"
                  }
                }
              }
            }
          }
        }
      },
      "jobs": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": true,
            }
          },
          "update": {
            "enabled": true
          },
          "job_id_format": {
            "enabled": true
          },
          "category_assignments": {
            "enabled": true
          },
          "cost_type_assignment_deletions": {
            "enabled": true
          },
          "cost_code_deletions": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "ERP Project ID"
            }
          }
        },
        "rules": {
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {
              "code": {
                "enabled": true,
                "validation": {
                  "format": {
                    "enabled": true,
                    "message": "ERP ID must be in the \"format\": %{job_code_format}.
                      This format can be edited in Erp Integration Settings."
                  }
                }
              }
            }
          },
          "save": {
            "fields": {
              "address": {
                "validation": {
                  "max_line_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              },
              "city": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 15
                  }
                }
              },
              "name": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              },
              "zip": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 10
                  }
                }
              },
              "state_code": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 4
                  }
                }
              }
            }
          }
        }
      },
      "sub_jobs": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": true
          },
          "update": {
            "enabled": true
          },
          "category_assignments": {
            "enabled": true
          },
          "cost_type_assignment_deletions": {
            "enabled": true
          },
          "cost_code_deletions": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "ERP Code"
            }
          }
        },
        "rules": {
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {
              "code": {
                "enabled": true,
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 10
                  }
                }
              }
            }
          },
          "save": {
            "fields": {
              "name": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              }
            }
          }
        }
      },
      "budgets": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true,
            "create": {
              "enabled": true,
            },
            "forecast_amounts": {
              "enabled": false
            }
          },
          "import": {
            "enabled": true
          },
          "sub_job_export": {
            "enabled": true
          },
          "revised_estimates_export": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "ERP Budget Code"
            }
          }
        },
        "rules": {
          "export": {
            "warning_message": {
              "enabled": true,
              "message": "Caution: Once this budget has been exported, it can no longer be imported."
            },
            "fields": {
              "code": {
                "enabled": false
              }
            }
          }
        }
      },
      "job_costs": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "original_estimate": {
              "enabled": true
            },
            "original_estimate_units": {
              "enabled": true
            },
            "approved_estimate_changes": {
              "enabled": true
            },
            "approved_estimate_unit_changes": {
              "enabled": true
            },
            "estimate": {
              "enabled": true
            },
            "estimate_units": {
              "enabled": true
            },
            "original_commitment": {
              "enabled": true
            },
            "approved_commitment_changes": {
              "enabled": true
            },
            "revised_commitment": {
              "enabled": true
            },
            "commitment_invoiced": {
              "enabled": true
            },
            "job_to_date_cost": {
              "enabled": true
            },
            "job_to_date_units": {
              "enabled": true
            },
            "job_to_date_dollars_paid": {
              "enabled": true
            },
            "month_to_date_cost": {
              "enabled": true
            },
            "month_to_date_dollars_paid": {
              "enabled": true
            },
            "month_to_date_units": {
              "enabled": true
            }
          }
        }
      },
      "job_cost_transactions": {
        "enabled": true,
        "tab": {
          "enabled": false
        },
        "configs": {
          "import": {
            "enabled": true
          }
        }
      },
      "commitments": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": false,
          },
          "unlink": {
            "enabled": true
          },
          "procore_contract_number": {
            "enabled": true
          },
          "export_purchase_orders": {
            "enabled": true
          },
          "export_subcontracts": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "ERP ID"
            }
          }
        },
        "rules": {
          "save": {
            "fields": {
              "title": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              },
              "number": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 12
                  }
                }
              }
            }
          },
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {
              "code": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Commitment ID can't be blank."
                  },
                  "max_length": {
                    "enabled": true,
                    "length": 12,
                    "message": "Commitment ID is too long.
                      Maximum %{length} characters."
                  }
                }
              }
            }
          }
        }
      },
      "commitment_items": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": false
          }
        },
        "tab": {
          "enabled": true
        },
        "rules": {
          "save": {
            "fields": {
              "quantity": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 8
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 4
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "total_amount": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 9
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 2
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "unit_cost": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 6
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 4
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "uom": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 6
                  }
                }
              },
              "cost_code": {
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": ""
                  },
                  "disallow_division": {
                    "enabled": true
                  }
                }
              },
              "line_item_type": {
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": ""
                  }
                }
              }
            }
          },
          "export": {
          }
        }
      },
      "commitment_change_orders": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true,
            "custom_fields": [
              {
                "key": "transaction_date",
                "label": "Transaction Date",
                "type": "date",
                "rules": {
                  "validation": {
                    "present": {
                      "enabled": true,
                      "message": "Please choose a date"
                    }
                  }
                }
              }
            ]
          },
          "unlink": {
            "enabled": true
          },
          "import": {
            "enabled": true
          },
          "procore_change_order_number": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": "ERP ID"
            }
          }
        },
        "rules": {
          "save": {
            "fields": {
              "title": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              },
              "number": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 5
                  }
                }
              }
            }
          },
          "export": {
            "warning_message": {
              "enabled": true,
              "message": "Caution: Please ensure that the commitment record associated
                with the change order you are about to export is not open for editing in ERP.
                If this export is attempted while the Sage record is being edited, an approved
                change order will be created without line items and will be uneditable without
                contacting your Sage representative."
            },
            "fields": {
              "code": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Commitment Change Order ID can't be blank."
                  },
                  "max_length": {
                    "enabled": true,
                    "length": 5,
                    "message": "Commitment Change Order ID cannot be more than %{length} characters."
                  }
                }
              }
            }
          }
        }
      },
      "commitment_change_order_items": {
        "enabled": true,
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": false
          }
        },
        "tab": {
          "enabled": true
        },
        "rules": {
          "save": {
            "fields": {
              "quantity": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 8
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 4
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "total_amount": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 9
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 2
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "unit_cost": {
                "validation": {
                  "max_length_units": {
                    "enabled": true,
                    "length": 6
                  },
                  "max_length_decimal": {
                    "enabled": true,
                    "length": 4
                  },
                  "numeric": {
                    "enabled": true
                  }
                }
              },
              "cost_code": {
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": ""
                  },
                  "disallow_division": {
                    "enabled": true
                  }
                }
              },
              "uom": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 6
                  }
                }
              }
            }
          },
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {
              "description": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 30
                  }
                }
              }
            }
          }
        }
      },
      "contract_payments": {
        "enabled": true,
        "tab": {
          "enabled": true
        },
        "configs": {
          "export": {
            "enabled": true
          },
          "import": {
            "enabled": true,
            "minimum_sync_version": "0"
          }
        }
      },
      "requisitions": {
        "enabled": false,
        "configs": {
          "export": {
            "enabled": false,
            "custom_fields": [
              {
                "key": "accounting_date",
                "label": "Accounting Date",
                "type": "date",
                "rules": {
                  "validation": {
                    "present": {
                      "enabled": true,
                      "message": "Please choose a date"
                    }
                  }
                }
              },
              {
                "key": "description",
                "label": "Description",
                "type": "string",
                "rules": {
                  "validation": {
                    "max_length": {
                      "enabled": true,
                      "length": 30,
                      "message": "Invoice description cannot be more than %{length} characters."
                    }
                  }
                }
              }
            ]
          },
          "sync_payments": {
            "enabled": true
          },
          "accounting_date": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": false
        },
        "rules": {
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {
              "invoice_number": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Invoice number can't be blank."
                  }
                }
              },
              "billing_date": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Billing date can't be blank."
                  }
                }
              },
              "origin_code": {
                "enabled": true,
                "validation": {
                  "present": {
                    "enabled": true,
                    "message": "Invoice ID can't be blank."
                  },
                  "max_length": {
                    "enabled": true,
                    "length": 15,
                    "message": "Invoice ID cannot be more than %{length} characters."
                  }
                }
              }
            }
          },
          "save": {
            "fields": {
              "invoice_number": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 15
                  }
                }
              }
            }
          }
        }
      },
      "prime_contracts": {
        "enabled": true,
        "configs": {
          "contract_item_delimiter": {
            "text": ""
          },
          "contract_item_format": {
            "text": "XXXXXXXXXX"
          },
          "import": {
            "enabled": true
          },
          "prime_contract_line_item_format": {
            "enabled": true
          }
        },
        "tab": {
          "enabled": true,
          "columns": {
            "code": {
              "enabled": true,
              "text": ""
            }
          }
        }
      },
      "prime_contract_change_orders": {
        "enabled": true,
        "configs": {
          "export_estimate_markup": {
            "enabled": true
          },
          "export": {
            "enabled": true,
            "custom_fields": [
              {
                "key": "transaction_date",
                "label": "Transaction Date",
                "type": "date",
                "rules": {
                  "validation": {
                    "present": {
                      "enabled": true,
                      "message": "Please choose a date"
                    }
                  }
                }
              }
            ]
          }
        },
        "tab": {
          "enabled": true
        },
        "rules": {
          "save": {
            "fields": {
              "title": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 255
                  }
                }
              },
              "number": {
                "validation": {
                  "max_length": {
                    "enabled": true,
                    "length": 20
                  }
                }
              }
            }
          },
          "export": {
            "fields": {
              "origin_code": {
                "enabled": false,
                "validation": {
                  "present": {
                    "enabled": false,
                    "message": "Prime Contract Change Order ID can't be blank."
                  },
                  "max_length": {
                    "enabled": false,
                    "length": 50,
                    "message": "Prime Contract Change Order ID cannot be more than %{length} characters."
                  }
                }
              }
            }
          }
        }
      },
      "payment_applications": {
        "enabled": false,
        "configs": {
          "export": {
            "enabled": false
          },
          "unlink": {
            "enabled": false
          }
        },
        "tab": {
          "enabled": false
        },
        "rules": {
          "export": {
            "warning_message": {
              "enabled": false,
              "message": ""
            },
            "fields": {}
          },
          "save": {
            "fields": {}
          }
        }
      }
    }
  }
}
```
