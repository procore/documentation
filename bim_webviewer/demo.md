---
permalink: /demo
title: 'Demo'
layout: default
section_title: BIM Web Viewer
---

<!-- markdownlint-disable no-inline-html -->

<div
  id="bim-webviewer-parent-element"
  style="width: 100%; height: 70vh; background-color: #f1f3f3"
></div>

<script src="https://unpkg.com/@procore/bim-webviewer-sdk@6.1.1"></script>
<script>
  const options = {
    parentElement: document.getElementById('bim-webviewer-parent-element'),
    meshUrl: '/documentation/bim_webviewer/parcel.mesh',
    meshnodeUrl: '/documentation/bim_webviewer/parcel.meshnode',
    nodeUrl: '/documentation/bim_webviewer/parcel.node',
    modelId: 1,
    modelRevisionId: 1,
    tools: [
      ProcoreBim.Webviewer.tools.CONTEXTMENU,
      ProcoreBim.Webviewer.tools.BOTTOMTOOL,
      ProcoreBim.Webviewer.tools.COACHMARKS,
      ProcoreBim.Webviewer.tools.MEASUREMENT_SD,
      ProcoreBim.Webviewer.tools.SETTINGS,
    ]
  };
  const viewer = new ProcoreBim.Webviewer(options);
  viewer.start();
</script>
