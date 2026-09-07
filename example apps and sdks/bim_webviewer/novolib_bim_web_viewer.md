---
permalink: /novolib-bim-web-viewer
title: "Novorender BIM Web Viewer API (Experimental)"
layout: default
section_title: Example Apps & SDKs
---

<!-- markdownlint-disable no-inline-html -->
<!-- Everything below the horizontal rule is generated from src/lib.tsx in novorender/novoweb by `npm run docs:update`. Hand edits there will be overwritten on the next run; edit the JSDoc instead. This header is hand maintained in scripts/docs/novolibDocsHeader.md. -->

## Get Started

<p class="heading-link-container"><a class="heading-link" href="#get-started"></a></p>

### Installation from NPM (recommended)

<p class="heading-link-container"><a class="heading-link" href="#installation-from-npm-recommended"></a></p>

The Novolib BIM Web Viewer is available as a module on `artifactory` as [`@procore/novolib-pilot`](https://artifacts.procoretech.com/ui/packages/npm:%2F%2F@procore%2Fnovolib-pilot).

To install it, open a terminal window in your project folder and run:

```sh
npm install @procore/novolib-pilot
```

## API Introduction

<p class="heading-link-container"><a class="heading-link" href="#api-introduction"></a></p>

When the Webviewer SDK is loaded and parsed on your page, a new global object of type `WebViewer` is added to your window, with the key `viewer`.
The WebViewer class exposes the public SDK and its functions. The functions are grouped into namespaces to indicate primary functionality.

### Webviewer Namespaces

<p class="heading-link-container"><a class="heading-link" href="#webviewer-namespaces"></a></p>

| Namespace      | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| &lt;_none_&gt; | **Core functions** of the SDK, not related to a particular namespace ([Core Functions](#the-core-functions)) |
| model          | Webviewer model data retrieval and manipulation ([model](#the-model-namespace))                              |
| camera         | Webviewer camera retrieval and manipulation ([camera](#the-camera-namespace))                                |
| gui            | Webviewer GUI manipulation ([gui](#the-gui-namespace))                                                       |
| events         | Webviewer event subscription ([events](#the-events-namespace))                                               |
| markers        | Webviewer marker collections ([markers](#the-markers-namespace))                                             |
| markup         | Webviewer 2D markup drawing ([markup](#the-markup-namespace))                                                |

---

## The Core Functions

### Constructor

```ts
new Webviewer(container, initOptions?): Webviewer;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `container` | `HTMLElement` | The HTML element where the Webviewer application will be mounted. This should be a valid HTML element that exists in the DOM. It is typically a div or similar container element that will hold the Webviewer UI. |
| `initOptions` | [`InitOptions`](#initoptions) | Initialization options, documented field by field on [InitOptions](#initoptions). Defaults to `{}`, which loads the default scene anonymously against the Novorender backend. |

#### Returns

`Webviewer`

A new instance of the Webviewer class.

#### Description

Creates a new instance of the Webviewer class.
This class is responsible for initializing and managing the Webviewer application.
It sets up the necessary configurations, renders the main application component,
and provides methods for interacting with the application.

#### Example

```TypeScript
const container = document.getElementById("webviewer-container");
const webviewer = new Webviewer(container, { sceneId: "myScene" });
```

#### Throws

Error if both `viewpoint` and `viewpointId` are set, since they are mutually exclusive.

### setLocale()

```ts
setLocale(locale): Promise<void>;
```

Changes the viewer UI language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` | An i18next locale code, such as `"es-ES"` or `"nb-NO"`. |

#### Returns

`Promise`\<`void`\>

***

### start()

```ts
start(): Promise<void>;
```

#### Returns

`Promise`\<`void`\>

void

#### Description

Starts the Webviewer application by rendering the main app component.
This function initializes the application and mounts it to the specified container.
It is typically called after the Webviewer instance has been created
and the necessary configurations have been set.

#### Example

```TypeScript
const container = document.getElementById("webviewer-container");
const webviewer = new Webviewer(container, { sceneId: "myScene" });
webviewer.start();
```

#### Throws

None

***

### terminate()

```ts
terminate(): Promise<void>;
```

#### Returns

`Promise`\<`void`\>

Promise<void>

#### Description

Terminates the Webviewer application by unmounting the root component
and resetting all internal properties to undefined.
This function is typically called when you want to clean up the application,
such as when navigating away from the page or when the application is no longer needed.
It ensures that all resources are released and the application state is reset.

#### Example

```TypeScript
const webviewer = new Webviewer(container, { sceneId: "myScene" });
webviewer.start();
// Later, when you want to terminate the application:
await webviewer.terminate();
```

#### Throws

None

## The model Namespace

```ts
model: {
  getSelectedObjects: () => Promise<string[]>;
  getHiddenObjects: () => Promise<string[]>;
  getObjectsBounds: (publicIds) => Promise<
     | {
     boundingBox: AABB3;
   }
    | undefined>;
  selectObjectsByInternalIds: (ids) => Promise<void>;
  selectObjects: (publicIds) => Promise<void>;
  deselectObjectsByInternalIds: (ids) => Promise<void>;
  deselectObjects: (publicIds) => Promise<void>;
  deselectAllObjects: () => Promise<void>;
  hideObjects: (ids, options?) => Promise<void>;
  showObjects: (ids) => Promise<void>;
  showAllObjects: () => Promise<void>;
  setXRayMode: () => void;
  setNormalMode: () => void;
  setObjectColor: (paletteParams) => Promise<void>;
  clearObjectColor: (publicIds) => Promise<void>;
  clearAllObjectColor: () => void;
  getXrayPickingEnabled: () => boolean;
  setXrayPickingEnabled: (enabled) => void;
  setSectionData: void;
  clearSection: void;
  setMeasurementVisible: (visible) => void;
  setCanvasSelectionEnabled: (enabled) => void;
  setBackgroundVisible: void;
  setSubtreesVisible: void;
  getSubtreesState: Subtrees;
  getViewpoint: (params) => Promise<GetViewpointResult>;
  setViewpoint: (viewpoint, options?) => Promise<void>;
  getModelRevision: () => Promise<
     | {
     modelId: string;
     revisionId: string;
     revisionNumber: number;
   }
    | undefined>;
};
```

### getSelectedObjects

```ts
getSelectedObjects: () => Promise<string[]>;
```

#### Returns

`Promise`\<`string`[]\>

Array<PublicId> An array containing the PublicIDs of the selected objects, or an empty
array if none are selected.

#### Description

Retrieves an array of selected object IDs.
This function returns the IDs of the objects that are currently selected in the scene.
It checks the selection state and returns the array of IDs if available.
If no objects are selected, it returns an empty array.

#### Example

```TypeScript
const selectedObjects = await webviewer.model.getSelectedObjects();
console.log(selectedObjects); // Logs the IDs of the selected objects.
```

#### Throws

None

### getHiddenObjects

```ts
getHiddenObjects: () => Promise<string[]>;
```

#### Returns

`Promise`\<`string`[]\>

Array<PublicId> An array containing the PublicIDs of the hidden objects, or an empty
array if none are hidden.

#### Description

Retrieves an array of hidden object IDs.
This function returns the IDs of the objects that are currently hidden in the scene.
If no objects are hidden, it returns an empty array.

#### Example

```TypeScript
const hiddenObjects = await webviewer.model.getHiddenObjects();
console.log(hiddenObjects); // Logs the IDs of the hidden objects.
```

#### Throws

None

### getObjectsBounds

```ts
getObjectsBounds: (publicIds) => Promise<
  | {
  boundingBox: AABB3;
}
| undefined>;
```

Returns a total bounding box for the provided objects.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicIds` | `string`[] | An array of object public IDs. |

#### Returns

`Promise`\<
  \| \{
  `boundingBox`: [`AABB3`](#aabb3);
\}
  \| `undefined`\>

An object containing the merged bounding box for all found objects.
If no objects are found (or none have a bounding box), returns `undefined`.

### selectObjectsByInternalIds

```ts
selectObjectsByInternalIds: (ids) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `number`[] | An array of Object IDs to select. |

#### Returns

`Promise`\<`void`\>

#### Description

Select objects by their internal IDs.
This function allows you to programmatically select objects in the scene.
It updates the selection state and emits selection events.

#### Example

```TypeScript
await webviewer.model.selectObjectsByInternalIds(objectIds);
```

### selectObjects

```ts
selectObjects: (publicIds) => Promise<void>;
```

Select objects by their public IDs (async).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicIds` | `string`[] | An array of Public IDs to select. |

#### Returns

`Promise`\<`void`\>

#### Example

```TypeScript
await webviewer.model.selectObjects(publicIds);
```

### deselectObjectsByInternalIds

```ts
deselectObjectsByInternalIds: (ids) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `number`[] | An array of Object IDs to deselect. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the objects have been deselected and events emitted.

#### Description

Deselect objects by their internal IDs.
This function allows you to programmatically deselect objects in the scene.
It updates the selection state and emits deselection events.

#### Example

```TypeScript
await webviewer.model.deselectObjectsByInternalIds(objectIds);
```

#### Throws

None

### deselectObjects

```ts
deselectObjects: (publicIds) => Promise<void>;
```

Deselect objects by their public IDs (async).
Converts public IDs to internal IDs and updates selection.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicIds` | `string`[] | An array of Public IDs to deselect. |

#### Returns

`Promise`\<`void`\>

#### Example

```TypeScript
await webviewer.model.deselectObjects(publicIds);
```

### deselectAllObjects

```ts
deselectAllObjects: () => Promise<void>;
```

#### Returns

`Promise`\<`void`\>

A promise that resolves when all objects have been deselected and events emitted.

#### Description

Deselects all currently selected objects in the scene.
This function clears the selection state by dispatching an action
to set the selected object IDs to an empty array.
It is useful for resetting the selection or when you want to ensure
that no objects are selected.

#### Example

```TypeScript
await webviewer.model.deselectAllObjects();
```

#### Throws

None

### hideObjects

```ts
hideObjects: (ids, options?) => Promise<void>;
```

Hides the specified objects in the scene.
Only the supplied `ids` are hidden by default.
Hidden objects are removed from the current selection unless `preserveSelection` is enabled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | An array of public IDs of the objects to hide. |
| `options?` | \{ `preserveSelection?`: `boolean`; `includeMainObjectToHide?`: `boolean`; \} | Optional behavior flags. |
| `options.preserveSelection?` | `boolean` | When true, keeps hidden objects in the current selection. |
| `options.includeMainObjectToHide?` | `boolean` | When true, also hides the current main object if it is not in `ids`. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the objects have been hidden.

#### Example

```TypeScript
await webviewer.model.hideObjects(["publicId1", "publicId2"]);
```

#### Throws

Error if the Webviewer is not initialized.

### showObjects

```ts
showObjects: (ids) => Promise<void>;
```

Shows (unhides) the specified objects in the scene.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | An array of public IDs of the objects to show. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the objects have been shown.

#### Example

```TypeScript
await webviewer.model.showObjects(["publicId1", "publicId2"]);
```

#### Throws

Error if the Webviewer dispatchers are not initialized.

### showAllObjects

```ts
showAllObjects: () => Promise<void>;
```

Shows all currently hidden objects in the scene.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all objects have been shown.

#### Example

```TypeScript
await webviewer.model.showAllObjects();
```

#### Throws

Error if the Webviewer dispatchers are not initialized.

### setXRayMode

```ts
setXRayMode: () => void;
```

#### Returns

`void`

void

#### Description

This function changes the visibility of all objects to X-Ray mode,
allowing for a transparent view of the objects in the scene.
This is particularly useful for inspecting objects that may be obscured by others,
or for visualizing the internal structure of complex objects.

#### Example

```TypeScript
webviewer.model.setXRayMode();
```

#### Throws

None - Will log a warning if the rendering mode is not set correctly.

### setNormalMode

```ts
setNormalMode: () => void;
```

#### Returns

`void`

void

#### Description

This function is used to reset the visibility of all objects in the scene to their normal state.
It is particularly useful when you want to clear any special rendering effects applied to objects
and return to the default view of the scene.
It ensures that all objects are rendered with their standard appearance, without any transparency or special
effects that may have been applied in other modes like X-Ray.
This function is typically used in scenarios where you want to switch back to a normal view
after inspecting objects in a different rendering mode, such as X-Ray mode.
It helps maintain a clear and standard view of the scene, making it easier to interact
with the objects and understand their relationships in the 3D space.

#### Example

```TypeScript
// Set the scene to normal mode
webviewer.model.setNormalMode();
```

#### Throws

None - Will log a warning if the rendering mode is not set correctly.

### setObjectColor

```ts
setObjectColor: (paletteParams) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `paletteParams` | [`PaletteParams`](#paletteparams)[] | An array of objects containing color and object IDs. |

#### Returns

`Promise`\<`void`\>

void

#### Description

Sets the color override for the specified object IDs, based on palettes provided.
This function allows you to set custom colors for objects in the scene, which can be used for highlighting,
categorization, or other visual distinctions.
The paletteParams parameter should be an array of objects, each containing a palette and an array of object IDs.
Each palette object can contain properties for default, xray, and selected colors, each with a color, and opacity.

#### Example

```TypeScript
const paletteParams = [{
   palette: {
       default: {color: "#FF0000", opacity: 0.75 },
       xray: { color: "#00FF00", opacity: 1 },
       selected: { color: "#0000FF", opacity: 1 }
   }
   publicIds: ['pubId1', 'pubId2', 'pubId3']},
];
webviewer.model.setObjectColor(paletteParams);
```

#### Throws

Error - If a palette contains an unknown key.

#### Throws

Error - If a palette's color hex string is malformed.

#### Throws

Error - If a palette's opacity is not in the proper range [0, 1].

### clearObjectColor

```ts
clearObjectColor: (publicIds) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicIds` | `string`[] | An array of public IDs for which to clear the color override. |

#### Returns

`Promise`\<`void`\>

void

#### Description

Clears the color override for the specified public IDs.
This function allows you to remove any custom color overrides that have been applied to objects in the scene.
It is useful when you want to revert objects back to their default appearance or when you want to clear
any temporary color changes made for highlighting or categorization purposes.
The function takes an array of object IDs for which the color override should be cleared.
It will remove the color overrides for those objects, allowing them to be rendered with their
default colors or styles as defined in the scene configuration.

#### Example

```TypeScript
const publicIds = ["pubId1", "pubId2", "pubId3"];
webviewer.model.clearObjectColor(publicIds);
```

#### Throws

None

### clearAllObjectColor

```ts
clearAllObjectColor: () => void;
```

#### Returns

`void`

void

#### Description

Clears all color overrides for all objects in the scene.
This function is useful when you want to reset the visual appearance of all objects.
It removes any custom color overrides that have been applied to objects,
allowing them to revert to their default rendering state.
This is particularly useful in scenarios where you want to
start fresh with the scene's visual representation,
such as when switching between different rendering modes
or when clearing temporary visual effects.

#### Example

```TypeScript
webviewer.model.clearAllObjectColor();
```

#### Throws

None

### getXrayPickingEnabled

```ts
getXrayPickingEnabled: () => boolean;
```

#### Returns

`boolean`

`true` if X-Ray objects are pickable, otherwise `false`.

#### Description

Returns whether semi-transparent objects rendered in X-Ray mode can be
picked (selected, right-clicked) by clicking on the canvas.
See setXrayPickingEnabled for details on the behaviour.

#### Example

```TypeScript
const enabled = webviewer.model.getXrayPickingEnabled();
console.log(enabled);
```

### setXrayPickingEnabled

```ts
setXrayPickingEnabled: (enabled) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `enabled` | `boolean` | `true` | Whether X-Ray objects should be pickable. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls whether semi-transparent objects rendered in X-Ray mode intercept
click events when picking on the canvas.

When disabled, X-Ray objects are treated as non-pickable, so
clicks pass through them to the opaque objects behind. This lets users select
and right-click occluded background objects (for example, highlighted assets
inside a building) without the semi-transparent foreground getting in the way.

When enabled, X-Ray objects become pickable again and clicks select the
front-most object as usual.

The change takes effect immediately while in X-Ray mode and is also honoured
whenever the viewer subsequently switches into X-Ray mode.

#### Example

```TypeScript
// Allow clicking through semi-transparent X-Ray objects to objects behind them
webviewer.model.setXrayPickingEnabled(false);

// Restore default picking of X-Ray objects
webviewer.model.setXrayPickingEnabled(true);
```

### setSectionData()

```ts
setSectionData(sectionData, mode?): void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `sectionData` | [`ProcoreClippingPlane`](#procoreclippingplane)[] | `undefined` | Section data in `ProcoreClippingPlane[]` format. |
| `mode?` | `ClippingMode` | `ClippingMode.union` | Clipping mode to use when applying the section planes. - `ClippingMode.union`: Combines all planes to create a union clipping effect. Default mode. - `ClippingMode.intersection`: Combines all planes to create an intersection clipping effect. |

#### Returns

`void`

void

#### Description

Sets the section planes for the model.
This function allows you to define clipping planes to section the model.

#### Example

**Procore format**

```TypeScript
const sections = [
  {
    direction: { x: 1, y: 0, z: 0 },
    location: { x: 0, y: 0, z: 0 },
  },
];
webviewer.model.setSectionData(sections);
```

### clearSection()

```ts
clearSection(): void;
```

#### Returns

`void`

void

#### Description

Clears all section planes from the model.
This function removes all clipping planes that have been applied to the model.

#### Example

```TypeScript
webviewer.model.clearSection();
```

### setMeasurementVisible

```ts
setMeasurementVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether measurements should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of active measurements in the scene.
When disabled, all measurement overlays and interactions are hidden.

#### Example

```TypeScript
// Hide all measurements
webviewer.model.setMeasurementVisible(false);

// Show measurements
webviewer.model.setMeasurementVisible(true);

// Default behavior (equivalent to true)
webviewer.model.setMeasurementVisible();
```

### setCanvasSelectionEnabled

```ts
setCanvasSelectionEnabled: (enabled) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `enabled` | `boolean` | `true` | Whether canvas selection should be enabled. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls whether objects can be selected by clicking on the canvas.
When disabled, canvas clicks will not select or highlight objects.
Right click context menus are disabled when canvas selection is disabled.

#### Example

```TypeScript
// Disable canvas selection
webviewer.model.setCanvasSelectionEnabled(false);

// Enable canvas selection
webviewer.model.setCanvasSelectionEnabled(true);

// Default behavior (equivalent to true)
webviewer.model.setCanvasSelectionEnabled();
```

### setBackgroundVisible()

```ts
setBackgroundVisible(visible?): void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether the background should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of the background in the scene.
When set to false, the background becomes fully transparent.
When set to true, the background becomes fully opaque.

#### Example

```TypeScript
// Hide the background
webviewer.model.setBackgroundVisible(false);

// Show the background
webviewer.model.setBackgroundVisible(true);

// Default behavior (equivalent to true)
webviewer.model.setBackgroundVisible();
```

### setSubtreesVisible()

```ts
setSubtreesVisible(subtrees): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `subtrees` | `Partial`\<`Record`\<[`Subtree`](#subtree), `boolean`\>\> | A partial record mapping subtree names to their desired visibility. Valid keys are: `"triangles"`, `"lines"`, `"terrain"`, `"points"`, `"documents"`. |

#### Returns

`void`

void

#### Description

Sets the visibility of one or more subtrees in the scene.
Each subtree key maps to a boolean: `true` shows the subtree, `false` hides it.
Subtrees that are marked as unavailable in the current scene are silently skipped.

#### Example

```TypeScript
// Show triangles and hide points
webviewer.model.setSubtreesVisible({ triangles: true, points: false });

// Hide all subtrees
webviewer.model.setSubtreesVisible({ triangles: false, lines: false, terrain: false, points: false, documents: false });
```

### getSubtreesState()

```ts
getSubtreesState(): Subtrees;
```

#### Returns

[`Subtrees`](#subtrees)

A `Subtrees` object mapping each subtree name to its current `SubtreeStatus`.

#### Description

Returns the current visibility status of all subtrees in the scene.
Each subtree can be in one of three states: `shown`, `hidden`, or `unavailable`.
`unavailable` means the subtree does not exist in the loaded scene.

#### Example

```TypeScript
const state = webviewer.model.getSubtreesState();
if (state.triangles === SubtreeStatus.Shown) {
    console.log("Triangles are visible");
}
```

### getViewpoint

```ts
getViewpoint: (params) => Promise<GetViewpointResult>;
```

This method will collect the current state of the scene and optionally a snapshot image and
return a Viewpoint object describing the scene. Used for exporting or saving
user's current view including metadata for later reuse.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`GetViewpointOptions`](#getviewpointoptions) | Options for viewpoint retrieval, such as name, grouping, snapshot options, etc. |

#### Returns

`Promise`\<[`GetViewpointResult`](#getviewpointresult)\>

Promise that resolves with the captured Viewpoint object.

#### Throws

Error if the Webviewer is not initialized.

### setViewpoint

```ts
setViewpoint: (viewpoint, options?) => Promise<void>;
```

Applies a given Viewpoint to the scene.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewpoint` | [`SetViewpointPayload`](#setviewpointpayload) | The Viewpoint payload describing the state to apply. |
| `options?` | [`SetViewpointOptions`](#setviewpointoptions) | Optional flags controlling how the viewpoint is applied. When `ignoreUndefined` is true, fields that are `undefined` on the payload are skipped instead of being reset to defaults. This allows applying a partial viewpoint update if one wants to first apply the viewpoint camera and then the rest of the viewpoint. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the Viewpoint has been applied.

#### Throws

Error if the Webviewer is not initialized.
        AbortError if the viewpoint application is aborted. This may happen if another setViewpoint call is made before the current one is complete.

### getModelRevision

```ts
getModelRevision: () => Promise<
  | {
  modelId: string;
  revisionId: string;
  revisionNumber: number;
}
| undefined>;
```

Retrieves the Procore BIM model revision associated with the current scene.
Returns `undefined` if not using the Procore backend or no matching revision is found.

Backed by the shared, session-cached model-revisions query, so repeated
calls (and other consumers) reuse a single request per opened model.

#### Returns

`Promise`\<
  \| \{
  `modelId`: `string`;
  `revisionId`: `string`;
  `revisionNumber`: `number`;
\}
  \| `undefined`\>

A promise resolving to the model revision info, or `undefined`.

#### Example

```TypeScript
const revision = await webviewer.model.getModelRevision();
if (revision) {
    console.log(revision.modelId);       // Procore BIM model UUID
    console.log(revision.revisionId);    // BIM model revision UUID
    console.log(revision.revisionNumber); // Revision number
}
```

***

## The camera Namespace

```ts
camera: {
  zoomToObjects: (publicIds) => Promise<void>;
  navToHomeView: () => Promise<void>;
  setPose: (pose) => Promise<void>;
  setType: (type, fixOrthoCameraToBestAxisAlignedView) => Promise<void>;
  getScreenPosition: (worldPosition) => vec2 | undefined;
  getSnapshotDataUrl: (options) => Promise<string>;
};
```

### zoomToObjects

```ts
zoomToObjects: (publicIds) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicIds` | `string`[] | An array of public IDs to zoom to. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the camera has been set to zoom to the bounding sphere.

#### Description

Zooms the camera to fit the bounding sphere of the specified objects.
This function calculates the bounding sphere of the objects and sets the camera to zoom to that sphere.

#### Example

```TypeScript
const publicIds = ["pubId1", "pibId2", "pubId3"];
await webviewer.camera.zoomToObjects(publicIds);
```

#### Throws

Error - If the viewer is not fully initialized yet.

#### Throws

Error - If the bounding sphere enclosing all the objects specified by ID could not be calculated.

### navToHomeView

```ts
navToHomeView: () => Promise<void>;
```

#### Returns

`Promise`\<`void`\>

A promise that resolves when the camera has been reset to the initial view.

#### Description

Resets the camera to the initial view.
This function sets the camera to the initial position and rotation defined in the explorer globals.
It is typically used to return the camera to a default view after navigating or interacting with the scene.
The function uses the `resetView` function defined in the explorer globals to perform the reset.
It is important to ensure that the `resetView` function is properly initialized before calling this method.
If the `resetView` function is not available, it will throw an error.

#### Example

```TypeScript
await webviewer.camera.navToHomeView();
```

#### Throws

Error - If the `resetView` function is not initialized.

### setPose

```ts
setPose: (pose) => Promise<void>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pose` | [`CameraPose`](#camerapose) |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the camera state has been updated, but the frame has not been rendered yet.

#### Description

Sets the camera to a specific pose.
This function allows you to set the camera to a specific pose in the scene.
Camera is placed at the `pose` relative to the scene bounding sphere center, and is rotated to look at the bounding sphere center.

#### Example

```TypeScript
await webviewer.camera.setPose({pose: "top"});
```

#### Throws

Error - If the viewer is not fully initialized yet

#### Throws

Error - If the bounding sphere is not available

### setType

```ts
setType: (type, fixOrthoCameraToBestAxisAlignedView) => Promise<void>;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `type` | `"pinhole"` \| `"orthographic"` | `undefined` | The type to set the camera to. |
| `fixOrthoCameraToBestAxisAlignedView` | `boolean` | `false` | If true, the orthographic camera will be fixed to the 2D view when switching to orthographic. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the camera state has been updated, but the frame has not been rendered yet.

#### Description

Sets the camera type to a specific type.
The type is specified as a string, which can be "orthographic" or "pinhole".

#### Examples

```TypeScript
await webviewer.camera.setType("orthographic");
```

```TypeScript
await webviewer.camera.setType("orthographic", true);
```

#### Throws

Error - If the viewer is not fully initialized yet

### getScreenPosition

```ts
getScreenPosition: (worldPosition) => vec2 | undefined;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worldPosition` | [`vec3`](#vec3) | The 3D position in world space coordinates as a vec3 [x, y, z]. |

#### Returns

[`vec2`](#vec2) \| `undefined`

A vec2 array [x, y] representing the screen coordinates in pixels, or undefined if the position is not visible on screen.

#### Description

Converts a 3D world space position to 2D screen space coordinates.
This function is useful for positioning 2D UI elements at specific 3D locations in the scene,
such as labels, annotations, or custom overlays that need to track objects in the 3D view.
The returned screen coordinates are in pixels relative to the canvas, with the origin at the top-left corner.

#### Example

```TypeScript
const worldPos = [10.5, 20.3, 5.0]; // 3D position in the scene
const screenPos = webviewer.camera.getScreenPosition(worldPos);
if (screenPos) {
    console.log(`Screen coordinates: x=${screenPos[0]}, y=${screenPos[1]}`);
    // Position a DOM element at this location
    element.style.left = `${screenPos[0]}px`;
    element.style.top = `${screenPos[1]}px`;
}
```

#### Throws

Error - If the viewer is not fully initialized yet.

### getSnapshotDataUrl

```ts
getSnapshotDataUrl: (options) => Promise<string>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `width?`: `number`; `height?`: `number`; `type?`: `"jpeg"` \| `"png"`; \} | The options for the snapshot. |
| `options.width?` | `number` | The width of the snapshot. |
| `options.height?` | `number` | The height of the snapshot. |
| `options.type?` | `"jpeg"` \| `"png"` | The type of the snapshot. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to a data URL string representing the snapshot in the specified format (JPEG or PNG).

#### Description

Gets the data URL of the current snapshot of the viewer.
If both options.width and options.height are provided, the snapshot will be resized to the given dimensions.
If only one of them is provided, the snapshot will be resized to maintain the aspect ratio.
If neither is provided, the snapshot will be the canvas size.
If provided width and height don't match canvas aspect ratio - portion of the canvas will be cropped to match the aspect ratio.

#### Default

```ts
options.type: "jpeg"
```

#### Example

```TypeScript
const dataUrl = await webviewer.camera.getSnapshotDataUrl({ width: 100, height: 100, type: "jpeg" });
```

***

## The gui Namespace

```ts
gui: {
  startPicking: (options) => Promise<PickingResult>;
  addContextMenuItem: (label) => void;
  removeContextMenuItems: (contextMenuItemIds) => void;
  addWindow: (windowId, window, options?) => void;
  removeWindow: (windowId) => void;
  openWindow: (windowId, options?) => void;
  closeWindow: (windowId) => void;
  togglePanelHeight: () => void;
  toggleWindow: (windowId) => void;
  addToolbarButton: (toolbarId, buttonEntry) => void;
  updateToolbarButtonState: (toolbarId, updates) => void;
  removeToolbarButton: (toolbarId, options) => void;
  getToolbarButtonOrder: (toolbarId) => string[];
  reorderToolbar: (toolbarId, options) => void;
  addPropertiesTab: (tabEntry) => void;
  removePropertiesTab: (tabId) => void;
  showCoachmark: (params) => void;
  hideCoachmark: (coachmarkId) => void;
  getSettings: () => {
     unitSystem: DisplayUnit;
  };
  convertUnit: (value, fromUnit, toUnit) => number;
  formatUnit: (value, unit, options?) => string;
  setToolbarVisible: (visible) => void;
  configureToolbarVisibility: (config?) => void;
  getUnitForUnitType: (unitSystem, unitType) => UomUnit;
  setHotkeysEnabled: (enabled) => void;
  setAxisSphereVisible: (visible) => void;
  setAxisSphereConstraints: (constraints) => void;
  getAxisSphereConstraints: () => 
     | AxisSphereConstraints
    | null;
  clearAxisSphereConstraints: () => void;
  setMiniMapVisible: (visible) => void;
  forceMiniMapRefresh: () => void;
  setJoysticksVisible: (visible) => void;
  setUpdateHomeViewVisible: (visible) => void;
};
```

### startPicking

```ts
startPicking: (options) => Promise<PickingResult>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`StartPickingOptions`](#startpickingoptions) | Session options. |

#### Returns

`Promise`\<[`PickingResult`](#pickingresult)\>

A promise resolving to `{ position, normal, snapType, internalObjectId,
         adjacentVertices, getObjectId }` for the picked point. `normal` comes from the
         underlying `view.pick()` sample and is only meaningful for a plain surface pick
         (`snapType: "none"`); for snapped features it is just the normal under the
         cursor. `adjacentVertices` holds the neighboring vertex positions for
         `corner`/`tangent`/`midpoint` snaps. `getObjectId()` lazily resolves
         `internalObjectId` to its external (public) id, or `null` when there is none.

#### Description

Starts a snap-enabled picking session against parametric (BREP) geometry.

While the session is active the viewer shows a lock-on highlight when the cursor nears an
edge, vertex, corner, midpoint, etc. within tolerance - identical to the PointLine measure
tool. The returned promise resolves once the user clicks/taps, regardless of whether a snap was successful.

Only one session can be active at a time: starting a new session (or aborting) rejects any
previous, still-pending promise with an `AbortError`. Pressing `Escape` also cancels the
active session (the promise rejects with an `AbortError`).

#### Throws

Error - If the viewer is not fully initialized yet.

#### Throws

AbortError - If the session is aborted or superseded by a new `startPicking` call.

#### Example

```TypeScript
const controller = new AbortController();
try {
    const { position, normal, snapType, internalObjectId, getObjectId } = await webviewer.gui.startPicking({
        snapTo: { point: true, edge: true },
        onHover: (info) => console.log("hovering", info),
        abortSignal: controller.signal,
    });
    // Resolve the external id only if you need it (may hit the network):
    const externalId = await getObjectId();
    console.log("picked", position, normal, snapType, internalObjectId, externalId);
} catch (e) {
    if ((e as Error).name === "AbortError") {
        // session was cancelled
    }
}
// cancel from elsewhere:
// controller.abort();
```

### addContextMenuItem

```ts
addContextMenuItem: (label) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `label` | \{ `label`: `string`; `id`: `string`; `onClick`: () => `void`; \} | The label for the context menu item. |
| `label.label` | `string` | - |
| `label.id` | `string` | - |
| `label.onClick` | () => `void` | - |

#### Returns

`void`

void

#### Description

Adds a context menu item to the Procore UX flavor.
This function allows you to add custom context menu items in the Procore UX flavor.

#### Example

```TypeScript
webviewer.gui.addContextMenuItem({
    label: "Custom Action",
    id: "custom-action",
    onClick: () => {
        console.log("Custom action clicked");
    },
});
```

#### Throws

Error - If the viewer is not fully initialized yet

### removeContextMenuItems

```ts
removeContextMenuItems: (contextMenuItemIds) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextMenuItemIds` | \{ `contextMenuItemIds`: `string`[]; \} | An array of the context menu item IDs to be removed. |
| `contextMenuItemIds.contextMenuItemIds` | `string`[] | - |

#### Returns

`void`

void

#### Description

Removes context menu items from the Procore UX flavor.
This function allows you to remove custom context menu items in the Procore UX flavor.

#### Example

```TypeScript
webviewer.gui.removeContextMenuItems({
    contextMenuItemIds: ["custom-action"],
});
```

#### Throws

Error - If the viewer is not fully initialized yet

### addWindow

```ts
addWindow: (windowId, window, options?) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `windowId` | `string` | A unique ID for the window. |
| `window` | `ComponentType`\<[`BaseWindowProps`](#basewindowprops)\> | The React component that will be rendered as the window content. Must implement `BaseWindowProps` (`{ position?: WindowPosition; onClose?: () => void }`). |
| `options?` | \{ `defaultPosition?`: [`WindowPosition`](#windowposition); `title?`: `string`; `icon?`: `ReactNode`; \} | Optional configuration. |
| `options.defaultPosition?` | [`WindowPosition`](#windowposition) | Initial position for desktop windows (default: `"center"`). |
| `options.title?` | `string` | Title for the panel header on mobile. Falls back to windowId if omitted. |
| `options.icon?` | `ReactNode` | Icon for the panel header on mobile. Omitted renders no icon. |

#### Returns

`void`

void

#### Description

Adds a custom window to the application.

**Cross-flavor behavior:**
- On desktop flavors (Procore/New/Classic), windows render as free-floating
  draggable windows via `WindowManager`. The `title` and `icon` options are
  silently unused.
- On mobile flavors (ProcoreAndroid/ProcoreIOS), windows are registered in
  **both** the side-panel and drawer stores. The active presentation depends
  on the current `panelMode` (tablet → side panel, phone → drawer). If the
  device rotates or resizes across the 430px short-dimension threshold, an
  open panel is automatically transferred between stores.
- `position` / `defaultPosition` are desktop-only concepts and are never
  passed to mobile panel renderers.

#### Example

```TypeScript
const MyWindow = ({ onClose, position = "center" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);

  return (
    <WebviewerWindow
      header="My Window"
      onClose={onClose}
      position={position ?? "center"}
      loading={loading}
    >
      <div>Data: {JSON.stringify(data)}</div>
    </WebviewerWindow>
  );
};
webviewer.gui.addWindow("my-window", MyWindow, {
  defaultPosition: "center",
  title: "My Window",
  icon: <MyIcon />,
});
```

#### Throws

Error - If the viewer is not fully initialized yet

### removeWindow

```ts
removeWindow: (windowId) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `windowId` | `string` | The ID of the window to remove. |

#### Returns

`void`

void

#### Description

Removes an existing window by its ID.
On mobile, unregisters from both side-panel and drawer stores.

#### Example

```TypeScript
webviewer.gui.removeWindow("views");
```

#### Throws

Error - If the viewer is not fully initialized yet

### openWindow

```ts
openWindow: (windowId, options?) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `windowId` | `string` | The ID of the window to open. |
| `options?` | \{ `position?`: [`WindowPosition`](#windowposition); \} | Optional options for the window. |
| `options.position?` | [`WindowPosition`](#windowposition) | - |

#### Returns

`void`

void

#### Description

Opens an existing window by its ID.
On mobile, dispatches to the active store (side panel or drawer) based on
the current `panelMode`. The `position` option is desktop-only and ignored
on mobile.

#### Example

```TypeScript
webviewer.gui.openWindow("views", { position: "topRight" });
```

#### Throws

Error - If the viewer is not fully initialized yet

### closeWindow

```ts
closeWindow: (windowId) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `windowId` | `string` | The ID of the window to close. |

#### Returns

`void`

void

#### Description

Closes an existing window by its ID.
On mobile, dispatches to the active store (side panel or drawer) based on
the current `panelMode`.

#### Example

```TypeScript
webviewer.gui.closeWindow("views");
```

#### Throws

Error - If the viewer is not fully initialized yet

### ~~togglePanelHeight~~

```ts
togglePanelHeight: () => void;
```

#### Returns

`void`

void

#### Description

Toggles the expand/collapse (half-height ↔ full-height) state of the active
mobile panel. On desktop this is a no-op; on mobile drawer mode it is also a
no-op (drawers do not support height toggling).

#### Example

```TypeScript
webviewer.gui.togglePanelHeight();
```

#### Throws

Error - If called on mobile before panel dispatchers are initialized

#### Deprecated

`togglePanelHeight` is a mobile-only concern that leaks layout state
into the SDK API. When all windows have migrated to `SlottedWindow` novoweb will
manage collapse state internally. This method will be removed in Q1 2027.

### toggleWindow

```ts
toggleWindow: (windowId) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `windowId` | `string` | The ID of the window to toggle. |

#### Returns

`void`

void

#### Description

Toggles the visibility of an existing window by its ID.
On mobile, dispatches to the active store (side panel or drawer) based on
the current `panelMode`.

#### Example

```TypeScript
webviewer.gui.toggleWindow("views");
```

#### Throws

Error - If the viewer is not fully initialized yet

### addToolbarButton

```ts
addToolbarButton: (toolbarId, buttonEntry) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toolbarId` | `string` | Logical toolbar ID (use [CORE\_TOOLBAR\_IDS](#core_toolbar_ids)). |
| `buttonEntry` | [`ToolbarButtonEntry`](#toolbarbuttonentry) | The complete button entry containing config and state. |

#### Returns

`void`

void

#### Description

Adds a button to a toolbar using a simple icon-based approach.
Just provide an icon and the framework handles the DefaultIconButton wrapping.

**Cross-flavor behavior:** The `toolbarId` is a logical ID (e.g. `"details"`).
On desktop flavors (Procore/New/Classic) it maps 1:1 to the physical toolbar.
On mobile flavors (ProcoreAndroid/ProcoreIOS) it is transparently routed to
the mobile equivalent (e.g. `"details"` → `"bottom-toolbar-general"`).

**Mobile limitations:** `component` overrides and `hasExpander` are not
rendered on the mobile HUD. Active state is driven by `state.active` on
mobile (no panel-open derivation for SDK buttons).

#### Example

```TypeScript
// Works on both desktop and mobile — logical ID is resolved automatically
webviewer.gui.addToolbarButton("details", {
    config: {
        id: "my-button",
        icon: <MyIcon />,
        position: 0,
        onClick: () => console.log("Clicked!"),
        title: "My Button",
    },
    state: {
        active: false,
        disabled: false,
        visible: true,
    }
});
```

#### Throws

Error - If the viewer is not fully initialized yet

### ~~updateToolbarButtonState~~

```ts
updateToolbarButtonState: (toolbarId, updates) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toolbarId` | `string` | Logical toolbar ID (use [CORE\_TOOLBAR\_IDS](#core_toolbar_ids)). |
| `updates` | \{ `id`: `string`; `active?`: `boolean`; `disabled?`: `boolean`; `visible?`: `boolean`; `expanderActive?`: `boolean`; \}[] | Array of button update objects. |

#### Returns

`void`

#### Description

Updates the state of one or more toolbar buttons (active, disabled, visible).
The `toolbarId` is resolved through the toolbar routing layer (see addToolbarButton).

#### Deprecated

No longer has any effect. Will be removed in a future release.

#### Example

```TypeScript
// Single button update
webviewer.gui.updateToolbarButtonState(
    "details",
    [{
        id: "my-button",
        active: true,
        disabled: false,
        visible: true,
    }]
);

// Multiple button updates
webviewer.gui.updateToolbarButtonState("details", [
    { id: "button1", active: true },
    { id: "button2", disabled: false },
    { id: "button3", visible: false }
]);
```

### removeToolbarButton

```ts
removeToolbarButton: (toolbarId, options) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toolbarId` | `string` | Logical toolbar ID (use [CORE\_TOOLBAR\_IDS](#core_toolbar_ids)). |
| `options` | \{ `buttonId`: `string`; \} | The removal options. |
| `options.buttonId` | `string` | The ID of the button to remove. |

#### Returns

`void`

#### Description

Removes a button from a toolbar.
The `toolbarId` is resolved through the toolbar routing layer (see addToolbarButton).

#### Example

```TypeScript
webviewer.gui.removeToolbarButton("details", {
    buttonId: "my-button"
});
```

### getToolbarButtonOrder

```ts
getToolbarButtonOrder: (toolbarId) => string[];
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toolbarId` | `string` | Logical toolbar ID (use [CORE\_TOOLBAR\_IDS](#core_toolbar_ids)). |

#### Returns

`string`[]

An array of button IDs in their current order.

#### Description

Gets the current order of buttons in a toolbar.
This method allows you to ascertain the current order of buttons in a toolbar,
which can be useful for understanding the current layout or for preparing
to reorder the toolbar.
The `toolbarId` is resolved through the toolbar routing layer (see addToolbarButton).

#### Example

```TypeScript
const buttonOrder = webviewer.gui.getToolbarButtonOrder("details");
console.log("Current button order:", buttonOrder);
```

#### Throws

Error - If the viewer is not fully initialized yet

#### Throws

Error - If the toolbar does not exist

### reorderToolbar

```ts
reorderToolbar: (toolbarId, options) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `toolbarId` | `string` | Logical toolbar ID (use [CORE\_TOOLBAR\_IDS](#core_toolbar_ids)). |
| `options` | \{ `buttonOrder`: `string`[]; \} | The reorder options. |
| `options.buttonOrder` | `string`[] | An array of button IDs in the desired order. Must include ALL existing button IDs exactly once. |

#### Returns

`void`

#### Description

Re-sorts a toolbar by defining a strict array of button IDs.
The order of the array determines the order of the toolbar buttons.
The `toolbarId` is resolved through the toolbar routing layer (see addToolbarButton).

STRICT REQUIREMENTS:
- All provided button IDs must exist in the toolbar
- All existing button IDs must be included in the new order (no missing buttons)
- No duplicate button IDs are allowed
- If any requirement is not met, the operation will fail and the toolbar order will remain unchanged

#### Example

```TypeScript
// Get current order first to ensure you have all button IDs
const currentOrder = webviewer.gui.getToolbarButtonOrder("details");

// Reorder with all existing buttons (this will work)
webviewer.gui.reorderToolbar("details", {
    buttonOrder: ["button1", "button3", "button2"]
});

// Reverse the current order (this will work)
const reversedOrder = [...currentOrder].reverse();
webviewer.gui.reorderToolbar("details", {
    buttonOrder: reversedOrder
});

// This will FAIL if you're missing any existing buttons:
// webviewer.gui.reorderToolbar("details", { buttonOrder: ["button1"] }); // Missing other buttons!
```

#### Throws

Error - If the viewer is not fully initialized yet

### addPropertiesTab

```ts
addPropertiesTab: (tabEntry) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tabEntry` | [`PropertiesTabEntry`](#propertiestabentry) | The tab entry to add. |

#### Returns

`void`

#### Description

Adds a properties tab to the properties window.

#### Example

```TypeScript
webviewer.gui.addPropertiesTab({
    config: {
        id: "properties",
        label: "Properties",
        component: PropertiesTabContent,
    },
});
```

### removePropertiesTab

```ts
removePropertiesTab: (tabId) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tabId` | `string` | The ID of the tab to remove. |

#### Returns

`void`

#### Description

Removes a property tab from the property window.

#### Example

```TypeScript
webviewer.gui.removePropertiesTab("properties");
```

### showCoachmark

```ts
showCoachmark: (params) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`Coachmark`](#coachmark) | Coachmark configuration |

#### Returns

`void`

void

#### Description

Shows a coachmark in the viewer.
Only one coachmark is displayed at a time. If multiple are shown, the last one takes priority.
When a coachmark is shown, it will override any built-in picker help that might be displayed.

#### Example

```TypeScript
webviewer.gui.showCoachmark({
    id: "section-plane-applied",
    label: "Section Plane Applied",
    buttonLabel: "Remove",
    buttonOnClick: () => {
        // Remove the section plane
        webviewer.model.clearSection();
        webviewer.gui.hideCoachmark("section-plane-applied");
    },
    tooltipMessage: "Section applied 4' 0\" above Level 1"
});
```

#### Throws

Error - If the viewer is not fully initialized yet

### hideCoachmark

```ts
hideCoachmark: (coachmarkId) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `coachmarkId` | `string` | The ID of the coachmark to hide |

#### Returns

`void`

void

#### Description

Hides a coachmark by ID.
If the coachmark is not currently shown, this is a no-op.

#### Example

```TypeScript
webviewer.gui.hideCoachmark("section-plane-applied");
```

#### Throws

Error - If the viewer is not fully initialized yet

### getSettings

```ts
getSettings: () => {
  unitSystem: DisplayUnit;
};
```

#### Returns

```ts
{
  unitSystem: DisplayUnit;
}
```

An object containing the current settings.

##### unitSystem

```ts
unitSystem: DisplayUnit;
```

#### Description

Retrieves the current settings of the Webviewer.
This includes user preferences such as unit system.

#### Example

```TypeScript
const settings = webviewer.gui.getSettings();
console.log("Current unit system:", settings.unitSystem);
```

#### Throws

None

### convertUnit

```ts
convertUnit: (value, fromUnit, toUnit) => number;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The numeric value to convert. |
| `fromUnit` | [`UomUnit`](#uomunit) | The unit of the input value. |
| `toUnit` | [`UomUnit`](#uomunit) | The unit to convert the value to. |

#### Returns

`number`

The converted value in the target unit.

#### Description

Converts a value from one unit to another.

#### Example

```TypeScript
const meters = webviewer.gui.convertUnit(10, UomUnit.ft, UomUnit.m);
console.log("10 feet in meters:", meters);
```

#### Throws

Error - If the unit conversion fails (for example, due to invalid units or internal errors).

### formatUnit

```ts
formatUnit: (value, unit, options?) => string;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The numeric value to format. |
| `unit` | [`UomUnit`](#uomunit) | The unit of the value. |
| `options?` | \{ `fixed?`: `number`; `precision?`: `number`; `locale?`: `string`; \} | Optional formatting options. |
| `options.fixed?` | `number` | Number of decimal places to fix the value to. |
| `options.precision?` | `number` | Maximum number of decimal places (defaults to 4). |
| `options.locale?` | `string` | Locale string for number formatting (defaults to the preferred language of the user). |

#### Returns

`string`

The formatted string with the value and unit.

#### Description

Formats a numeric value with its unit for display.
For feet (ft) and inches (in) units, the formatting uses a special feet-inches representation (e.g., "1' 6\"").

#### Example

```TypeScript
const formattedLength = webviewer.gui.formatUnit(10.5, UomUnit.m, { fixed: 2 });
console.log("Formatted length:", formattedLength);
// Output: "10.50 m"

const formattedFeet = webviewer.gui.formatUnit(1.5, UomUnit.ft);
console.log("Formatted feet:", formattedFeet);
// Output: "1' 6\""
```

#### Throws

None

### setToolbarVisible

```ts
setToolbarVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether toolbars should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of all toolbars in the interface.
When disabled, all toolbars will be hidden from view.
For selective per-toolbar control, use configureToolbarVisibility instead.

#### Example

```TypeScript
// Hide all toolbars
webviewer.gui.setToolbarVisible(false);

// Show toolbars
webviewer.gui.setToolbarVisible(true);

// Default behavior (equivalent to true)
webviewer.gui.setToolbarVisible();
```

### configureToolbarVisibility

```ts
configureToolbarVisibility: (config?) => void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `Partial`\<`Record`\<[`VisibilityToolbarId`](#visibilitytoolbarid), `boolean`\>\> | A map of toolbar IDs (from [VISIBILITY\_TOOLBAR\_IDS](#visibility_toolbar_ids)) to their desired visibility. |

#### Returns

`void`

void

#### Description

Declaratively sets the visibility of individual toolbars in a single call.
Toolbars omitted from the config retain their current visibility.
Calling with no arguments restores all toolbars to their default visible state.

This is the preferred way to control per-toolbar visibility — use it instead of
combining setToolbarVisible with individual overrides.

#### Example

```TypeScript
// Hide all default controls, keep only the details toolbar visible
webviewer.gui.configureToolbarVisibility({
    "quick-access": false,
    "nav-wheel": false,
});

// Restore all toolbars to visible
webviewer.gui.configureToolbarVisibility();
```

### getUnitForUnitType

```ts
getUnitForUnitType: (unitSystem, unitType) => UomUnit;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `unitSystem` | [`DisplayUnit`](#displayunit) | The display unit system (e.g., "m", "ftin"). |
| `unitType` | [`UnitType`](#unittype) | The type of unit to retrieve (length, area, or volume). |

#### Returns

[`UomUnit`](#uomunit)

The corresponding UomUnit for the specified unit type and display unit system.

#### Description

Returns the appropriate unit for a given unit type based on the current display unit system.

#### Example

```TypeScript
const lengthUnit = webviewer.gui.getUnitForUnitType("m", "length");
console.log("Length unit for metric system:", lengthUnit);
```

#### Throws

None

### setHotkeysEnabled

```ts
setHotkeysEnabled: (enabled) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `enabled` | `boolean` | `true` | Whether hotkeys should be enabled. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls whether keyboard hotkeys are enabled.
When disabled, hotkeys are ignored by the viewer.
WASD and Arrow Keys remain functional even when hotkeys are disabled.

#### Example

```TypeScript
// Disable hotkeys
webviewer.gui.setHotkeysEnabled(false);

// Enable hotkeys
webviewer.gui.setHotkeysEnabled(true);

// Default behavior (equivalent to true)
webviewer.gui.setHotkeysEnabled();
```

### setAxisSphereVisible

```ts
setAxisSphereVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether the axis sphere should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of the axis sphere (3D orientation indicator).
When hidden, the axis sphere will not be rendered in the viewport.

#### Example

```TypeScript
// Hide the axis sphere
webviewer.gui.setAxisSphereVisible(false);

// Show the axis sphere
webviewer.gui.setAxisSphereVisible(true);

// Default behavior (equivalent to true)
webviewer.gui.setAxisSphereVisible();
```

### setAxisSphereConstraints

```ts
setAxisSphereConstraints: (constraints) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `constraints` | [`AxisSphereConstraints`](#axissphereconstraints) |

#### Returns

`void`

#### Description

Applies constraints to the AxisSphere navigation widget, limiting which camera
orientations the user can navigate to via the AxisSphere.

This is a GUI-level constraint that only affects the AxisSphere widget.
Camera movement via mouse drag, keyboard, and joystick is not affected.

Allowed values for `allowedViews`:
  - `"zenith"` — overhead views only (TOP, N/S/E/W faces, ring drag).
  - `"equatorial"` — side views only (FRONT/BACK/LEFT/RIGHT).
  - `"zenith+equatorial"` — overhead and side views (bottom and corners blocked).

#### Example

```TypeScript
// Restrict to overhead orientations only (e.g. for 2D mapping mode)
webviewer.gui.setAxisSphereConstraints({ allowedViews: 'zenith' });
```

### getAxisSphereConstraints

```ts
getAxisSphereConstraints: () => 
  | AxisSphereConstraints
  | null;
```

#### Returns

  \| [`AxisSphereConstraints`](#axissphereconstraints)
  \| `null`

#### Description

Returns the currently active AxisSphere constraints, or null if none are set.

#### Example

```TypeScript
const constraints = webviewer.gui.getAxisSphereConstraints();
// → { allowedViews: 'zenith' } | null
```

### clearAxisSphereConstraints

```ts
clearAxisSphereConstraints: () => void;
```

#### Returns

`void`

#### Description

Removes all active AxisSphere constraints, restoring full navigation freedom.

#### Example

```TypeScript
webviewer.gui.clearAxisSphereConstraints();
```

### setMiniMapVisible

```ts
setMiniMapVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether the mini map should be visible (when available). Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of the mini map (when available).
When hidden, the mini map will not be rendered in the viewport.

#### Example

```TypeScript
// Hide the mini map
webviewer.gui.setMiniMapVisible(false);
```

### forceMiniMapRefresh

```ts
forceMiniMapRefresh: () => void;
```

#### Returns

`void`

void

#### Description

Force a refetch of the mini map data (levels, drawings, drawing/model
mappings) from the Procore BIM service.

The mini map normally refetches on its own when the Procore context
(`companyId` / `projectId` / `sceneVersionId`) or the scene id
changes. Call this method when the host application has reason to
believe the underlying server data has changed without those inputs
changing — for example, when a user action in the surrounding
application flips `use_for_2d_nav` for one of the drawings.

No-op when the Procore context is incomplete (missing `companyId`,
`projectId`, or `sceneVersionId`).

#### Example

```TypeScript
// After the host app has applied a "Use for 2D Navigation" change:
webviewer.gui.forceMiniMapRefresh();
```

### setJoysticksVisible

```ts
setJoysticksVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether the joysticks should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of the joysticks (joysticks are only available on mobile devices / in the mobile UI).
When hidden, the joysticks will not be rendered in the viewport.

#### Example

```TypeScript
// Hide the joysticks
webviewer.gui.setJoysticksVisible(false);
```

### setUpdateHomeViewVisible

```ts
setUpdateHomeViewVisible: (visible) => void;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `visible` | `boolean` | `true` | Whether the update home view should be visible. Defaults to true if not provided. |

#### Returns

`void`

void

#### Description

Controls the visibility of the update home view.
When hidden, the update home view will not be rendered in the viewport.

#### Example

```TypeScript
// Shows the update home view
webviewer.gui.setUpdateHomeViewVisible();
```

***

## The events Namespace

Event handling system for the Webviewer.
Allows adding and removing event listeners for various Webviewer events.

```ts
events: {
  addEventListener: <E>(eventName, callback, options?) => () => void;
  removeEventListener: <E>(eventName, callback) => void;
};
```

### Example

```TypeScript
// Adding an event listener
webviewer.events.addEventListener("selectionChanged", (event) => {
    console.log("Selection changed:", event.selectedObjects);
});

// Removing an event listener
const onSelectionChanged = (event) => {
    console.log("Selection changed:", event.selectedObjects);
};
webviewer.events.addEventListener("selectionChanged", onSelectionChanged);
// Later...
webviewer.events.removeEventListener("selectionChanged", onSelectionChanged);
```

### Throws

None

### addEventListener

```ts
addEventListener: <E>(eventName, callback, options?) => () => void;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `E` *extends* keyof [`WebviewerEventMap`](#webviewereventmap) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `E` | - |
| `callback` | [`WebviewerEventCallback`](#webviewereventcallback)\<`E`\> | - |
| `options?` | [`EventSubscriptionOptions`](#eventsubscriptionoptions) | - |

#### Returns

A function that can be called to unsubscribe the listener.

() => `void`

#### Description

Adds an event listener for the specified event.

### removeEventListener

```ts
removeEventListener: <E>(eventName, callback) => void;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `E` *extends* keyof [`WebviewerEventMap`](#webviewereventmap) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `E` | - |
| `callback` | [`WebviewerEventCallback`](#webviewereventcallback)\<`E`\> | - |

#### Returns

`void`

#### Description

Removes an event listener for the specified event.

## The markers Namespace

Marker collection toolbox for the Webviewer.
Allows creating, removing, and managing marker collections.

```ts
markers: {
  createCollection: (id, config, markerCreationConfig) => MarkerCollection;
  getCollection: (id) => MarkerCollection;
  getCollectionIds: () => string[];
  removeCollection: (id) => void;
};
```

### Example

```TypeScript
// Creating a marker collection
const issues = webviewer.markers.createCollection("issues", {
  // Set pin color based on severity
  getPinColor: (marker) => {
    switch (marker.metadata.severity) {
      case "critical":
        return "#D32F2F";
      case "high":
        return "#F44336";
      case "medium":
        return "#FF9800";
      case "low":
        return "#FFC107";
      default:
        return "#757575";
    }
  },

  // Set opacity to 0.4 for resolved issues, otherwise 1.0
  getPinOpacity: (marker) => marker.metadata.status === "resolved" ? 0.4 : 1.0,

  // Use yellow when a marker is hovered
  getHoverColor: () => "#FFEB3B",

  // Use purple when a marker is selected
  getSelectedColor: () => "#9C27B0",
});
```
More config options can be found in the MarkerCollectionConfig type.

### Throws

None

### createCollection

```ts
createCollection: (id, config, markerCreationConfig) => MarkerCollection;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `config` | [`MarkerCollectionConfig`](#markercollectionconfig) |
| `markerCreationConfig` | [`MarkerCreationFlowConfig`](#markercreationflowconfig) |

#### Returns

[`MarkerCollection`](#markercollection)

### getCollection

```ts
getCollection: (id) => MarkerCollection;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

[`MarkerCollection`](#markercollection)

### getCollectionIds

```ts
getCollectionIds: () => string[];
```

#### Returns

`string`[]

### removeCollection

```ts
removeCollection: (id) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`void`

## The markup Namespace

```ts
markup: {
  drawAnchored: (anchoredMarkupData) => Promise<void>;
  draw: (markupData) => Promise<void>;
  clear: () => void;
};
```

### drawAnchored

```ts
drawAnchored: (anchoredMarkupData) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `anchoredMarkupData` | [`AnchoredSvgData`](#anchoredsvgdata) | The anchored markup data containing arrays of different markup elements to draw |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the markup has been drawn

#### Description

Draws various types of markup (ellipses, lines, arrows, texts, and rects) on an SVG canvas based on the provided anchoredMarkupData.

The anchoredMarkupData is an object that contains arrays of different types of markup elements, each with their own properties.

Once anchoredMarkupData is drawn via a call to drawAnchored, the markup will be redrawn whenever the camera is updated.
The anchored markup will continue drawing at its anchored position in the model until markup.clear is called.
Unless you are updating the anchor positions, there is no reason to call drawAnchored multiple times.

#### Understanding anchorOffset
The `anchorOffset` determines where on the SVG element the anchor point should be positioned.
It should be specified in **viewBox coordinates** - the same coordinate system you see when editing the SVG file.
The renderer automatically handles the mapping to rendered pixel coordinates.

### draw

```ts
draw: (markupData) => Promise<void>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markupData` | [`SvgData`](#svgdata) | The markup data containing arrays of different markup elements to draw |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the markup has been drawn

#### Description

Draws various types of markup (ellipses, lines, arrows, texts, and rects) on an SVG canvas based on the provided markupData
The markupData is an object that contains arrays of different types of markup
elements, each with their own properties.

Any existing markup will NOT be cleared. Subsequent draw calls will be drawn on
top of previous ones. Use markup.clear to clear the screen before subsequent
markup.draw calls if necessary.

### clear

```ts
clear: () => void;
```

#### Returns

`void`

void

#### Description

Clears all markup from the SVG canvas.

## Types and Constants

### AABB3

#### min

```ts
readonly min: ReadonlyVec3;
```

***

#### max

```ts
readonly max: ReadonlyVec3;
```

### Anchorable

```ts
type Anchorable = {
  anchor: vec3;
  anchorOffset?: vec2;
};
```

#### anchor

```ts
anchor: vec3;
```

***

#### anchorOffset?

```ts
optional anchorOffset?: vec2;
```

### AnchorableLine

```ts
type AnchorableLine = {
  anchorStart: vec3;
  anchorEnd: vec3;
};
```

#### anchorStart

```ts
anchorStart: vec3;
```

***

#### anchorEnd

```ts
anchorEnd: vec3;
```

### AnchoredArrow

```ts
type AnchoredArrow = Omit<Arrow, "start" | "end"> & AnchorableLine;
```

### AnchoredBoxEllipse

```ts
type AnchoredBoxEllipse = BoxEllipse & Anchorable;
```

### AnchoredLine

```ts
type AnchoredLine = Omit<Line, "start" | "end"> & AnchorableLine;
```

### AnchoredRadiusEllipse

```ts
type AnchoredRadiusEllipse = Omit<RadiusEllipse, "center"> & Anchorable;
```

### AnchoredRect

```ts
type AnchoredRect = Omit<Rect, "x" | "y"> & Anchorable;
```

### AnchoredSvgContent

```ts
type AnchoredSvgContent = Omit<SvgContent, "origin"> & Anchorable & {
  anchorOffsetCoordinateType?: "screen" | "viewBox";
};
```

#### Type Declaration

#### anchorOffsetCoordinateType?

```ts
optional anchorOffsetCoordinateType?: "screen" | "viewBox";
```

### AnchoredSvgData

```ts
type AnchoredSvgData = {
  ellipses?: (
     | AnchoredBoxEllipse
    | AnchoredRadiusEllipse)[];
  lines?: AnchoredLine[];
  arrows?: AnchoredArrow[];
  texts?: AnchoredText[];
  rects?: AnchoredRect[];
  svgContents?: AnchoredSvgContent[];
};
```

#### ellipses?

```ts
optional ellipses?: (
  | AnchoredBoxEllipse
  | AnchoredRadiusEllipse)[];
```

***

#### lines?

```ts
optional lines?: AnchoredLine[];
```

***

#### arrows?

```ts
optional arrows?: AnchoredArrow[];
```

***

#### texts?

```ts
optional texts?: AnchoredText[];
```

***

#### rects?

```ts
optional rects?: AnchoredRect[];
```

***

#### svgContents?

```ts
optional svgContents?: AnchoredSvgContent[];
```

### AnchoredText

```ts
type AnchoredText = Omit<Text, "origin"> & Anchorable;
```

### AppResizePayload

Payload for the appResize event.
Contains the new dimensions of the application viewport after a resize event.
This is emitted when the browser window or container element is resized.

#### width

```ts
width: number;
```

The new width of the viewport in pixels.

***

#### height

```ts
height: number;
```

The new height of the viewport in pixels.

### Arrow

```ts
type Arrow = Interactive<ArrowBase>;
```

### AxisSphereConstraints

```ts
type AxisSphereConstraints = {
  allowedViews: "zenith" | "equatorial" | "zenith+equatorial";
};
```

Constraints for the AxisSphere navigation widget.
Controls which camera orientations the user can navigate to via the AxisSphere.

#### allowedViews

```ts
allowedViews: "zenith" | "equatorial" | "zenith+equatorial";
```

Which elevation zone(s) the AxisSphere may navigate to:
  - `"zenith"` — overhead views only (TOP, N/S/E/W faces, ring drag). Side and bottom faces blocked.
  - `"equatorial"` — side views only (FRONT/BACK/LEFT/RIGHT). Overhead and bottom faces blocked.
  - `"zenith+equatorial"` — overhead and side views. Only the bottom face and corners are blocked.

### BaseWindowProps

Props for all window components (core and third-party).
WindowManager provides onClose and position.
Focus and z-index stacking are handled by WindowManager's wrapper div —
components do not need to accept or forward those concerns.

#### position?

```ts
optional position?: WindowPosition;
```

***

#### onClose?

```ts
optional onClose?: () => void;
```

##### Returns

`void`

### BoxEllipse

```ts
type BoxEllipse = Interactive<BoxEllipseBase>;
```

### Camera

```ts
type Camera = 
  | {
  perspective: PerspectiveCamera;
}
  | {
  orthogonal: OrthogonalCamera;
};
```

### CameraPose

```ts
type CameraPose = {
  pose: "top";
};
```

A named camera orientation to move to.

#### pose

```ts
pose: "top";
```

The only pose currently supported: look straight down at the model.

### Coachmark

```ts
type Coachmark = {
  id: string;
  label: string;
  buttonLabel?: string;
  buttonOnClick?: () => void;
  tooltipMessage?: string;
};
```

#### id

```ts
id: string;
```

***

#### label

```ts
label: string;
```

***

#### buttonLabel?

```ts
optional buttonLabel?: string;
```

***

#### buttonOnClick?

```ts
optional buttonOnClick?: () => void;
```

##### Returns

`void`

***

#### tooltipMessage?

```ts
optional tooltipMessage?: string;
```

### Color

```ts
type Color = {
  color: string;
  opacity: number;
};
```

#### color

```ts
color: string;
```

Hex color string: `#` followed by exactly six hexadecimal digits, e.g. `"#FF0000"`.

***

#### opacity

```ts
opacity: number;
```

Opacity from 0 (fully transparent) to 1 (fully opaque), inclusive.

### CORE_TOOLBAR_IDS

```ts
const CORE_TOOLBAR_IDS: {
  DETAILS: "details";
  BOTTOM_NAV: "bottom-nav";
  ADVANCED_FEATURES: "advanced-features-menu";
};
```

Managed toolbar IDs — toolbars that support the full button API
(`addToolbarButton`, `updateToolbarButtonState`, `reorderToolbar`, etc.).

#### Type Declaration

#### DETAILS

```ts
readonly DETAILS: "details" = "details";
```

#### BOTTOM\_NAV

```ts
readonly BOTTOM_NAV: "bottom-nav" = "bottom-nav";
```

#### ADVANCED\_FEATURES

```ts
readonly ADVANCED_FEATURES: "advanced-features-menu" = "advanced-features-menu";
```

### DisplayUnit

```ts
type DisplayUnit = "m" | "mm" | "ftin";
```

### EventSubscriptionOptions

#### stopOnError?

```ts
optional stopOnError?: boolean;
```

Whether to stop executing subsequent callbacks if this callback throws an error.
If not specified, uses the global default from EventEmitter configuration.

### GetViewpointOptions

Options for retrieving a viewpoint.

#### name?

```ts
optional name?: string;
```

The display name of the viewpoint.

***

#### grouping?

```ts
optional grouping?: string;
```

Optional grouping/category for the viewpoint.

***

#### createSnapshot?

```ts
optional createSnapshot?: boolean;
```

Whether to create a snapshot for the viewpoint.

##### Default

```ts
true
```

***

#### snapshotType?

```ts
optional snapshotType?: "jpeg" | "png";
```

Optional image format for the viewpoint's snapshot.

##### Default

```ts
"jpeg"
```

***

#### snapshotWidth?

```ts
optional snapshotWidth?: number;
```

Optional width of the snapshot image in pixels.

##### Default

```ts
374
```

***

#### snapshotHeight?

```ts
optional snapshotHeight?: number;
```

Optional height of the snapshot image in pixels.

##### Default

```ts
208
```

### GetViewpointResult

```ts
type GetViewpointResult = Omit<Viewpoint, "id">;
```

A captured viewpoint. Carries no `id` because it has not been persisted — pass it to
`setViewpoint` to apply it, or store it yourself.

### InitOptions

```ts
type InitOptions = {
  auth?: InitOptionsAuth;
  sceneId?: string;
  viewpointId?: string;
  viewpoint?: Viewpoint;
  backendProvider?: "novorender" | "procore";
  procore?: {
     companyId: number;
     projectId: number;
     sceneVersionId?: string;
     enableFullSync?: boolean;
     nodeClassSelection?: boolean;
     spaceMouse?: boolean;
     objectTreeV2?: boolean;
     objectMeasure?: boolean;
     disableIncrementalCaching?: boolean;
     enableBimIndex?: boolean;
     gpuGuidance?: boolean;
  };
  platform?: Platform;
  overlayElementsZIndex?: number;
  locale?: string;
};
```

#### auth?

```ts
optional auth?: InitOptionsAuth;
```

Authentication data to use in the app.
Can only be omitted for anonymous scenes, otherwise the app won't load.

***

#### sceneId?

```ts
optional sceneId?: string;
```

Scene ID to load.
For Procore backend: This should be the Scene ID (not the Version ID).
If omitted when using Procore backend, will fall back to sceneVersionId.
If omitted for Novorender backend - default scene ID will be used.

***

#### viewpointId?

```ts
optional viewpointId?: string;
```

Optional viewpoint ID.
If provided, the viewpoint will be loaded and applied to the scene.
Works only with Procore backend.

Mutually exclusive with [InitOptions.viewpoint](#viewpoint) — supplying both
to the `Webviewer` constructor throws an `Error`.

***

#### viewpoint?

```ts
optional viewpoint?: Viewpoint;
```

Optional fully-constructed viewpoint to apply as the initial view.

When provided, the viewer is initialized with this viewpoint without making
an additional backend round-trip to fetch it. Use this when the caller can
build the desired initial state (camera, hidden objects, section plane, etc.)
client-side and wants to skip the persist-then-fetch round-trip that
[InitOptions.viewpointId](#viewpointid) requires.

This affects the initial view only — `resetView` does not reset to this
viewpoint. For the Procore backend, `resetView` continues to apply the
resolved BIM model home view.

Works with any backend provider. Mutually exclusive with
[InitOptions.viewpointId](#viewpointid) — supplying both throws an `Error`.

***

#### backendProvider?

```ts
optional backendProvider?: "novorender" | "procore";
```

Backend provider to use for API calls.

##### Default

```ts
'novorender'
```

***

#### procore?

```ts
optional procore?: {
  companyId: number;
  projectId: number;
  sceneVersionId?: string;
  enableFullSync?: boolean;
  nodeClassSelection?: boolean;
  spaceMouse?: boolean;
  objectTreeV2?: boolean;
  objectMeasure?: boolean;
  disableIncrementalCaching?: boolean;
  enableBimIndex?: boolean;
  gpuGuidance?: boolean;
};
```

Procore context required to call Procore BIM endpoints.
Required when backendProvider is 'procore'.

##### companyId

```ts
companyId: number;
```

##### projectId

```ts
projectId: number;
```

##### sceneVersionId?

```ts
optional sceneVersionId?: string;
```

Optional scene version id. If provided, novoweb can query `/metadata_files`
for compatibility checks and future metadata integrations.

##### enableFullSync?

```ts
optional enableFullSync?: boolean;
```

Opt-in: show the "Download for offline" / "Remove from Device" section
in Settings. Only takes effect when the platform is a mobile design
(Android or iOS). Has no effect on web.

###### Default

```ts
false
```

##### nodeClassSelection?

```ts
optional nodeClassSelection?: boolean;
```

Enable NodeClass-aware FirstObject/LastObject selection for this
Procore viewer instance. The embedding host evaluates its rollout
flag (for example, LaunchDarkly) and passes the resolved value.

###### Default

```ts
false
```

##### spaceMouse?

```ts
optional spaceMouse?: boolean;
```

Expose the SpaceMouse setting for this Procore viewer instance. The
embedding host evaluates its rollout flag (for example, LaunchDarkly)
and passes the resolved value. When off, the setting is hidden and no
connection to the local 3Dconnexion driver is attempted.

###### Default

```ts
false
```

##### objectTreeV2?

```ts
optional objectTreeV2?: boolean;
```

Enable the Object Tree V2 experience for this Procore viewer instance. The
embedding host evaluates its rollout flag (for example, LaunchDarkly) and
passes the resolved value. When off, the existing Object Tree is shown.

###### Default

```ts
false
```

##### objectMeasure?

```ts
optional objectMeasure?: boolean;
```

Enable the object-to-object measurement tool for this Procore viewer
instance. The embedding host evaluates its rollout flag (for example,
LaunchDarkly) and passes the resolved value. When off, the tool's button is
hidden from the measure toolbars and its keyboard shortcut is inert.

###### Default

```ts
false
```

##### disableIncrementalCaching?

```ts
optional disableIncrementalCaching?: boolean;
```

Disable incremental offline caching. Only takes effect on iOS
(`platform: Platform.iOS`); ignored on web and Android. The embedding
host evaluates its rollout flag and passes the resolved value.
When true on iOS, incremental caching is not armed. Existing cached
data (incremental or downloaded) is left untouched; users can clear
it via browser/website data settings if needed.

###### Default

```ts
false
```

##### enableBimIndex?

```ts
optional enableBimIndex?: boolean;
```

Enable BIM index for this Procore viewer instance. The embedding host
evaluates its rollout flag (for example, LaunchDarkly) and passes the
resolved value. When off, the BIM index is not used.

###### Default

```ts
false
```

##### gpuGuidance?

```ts
optional gpuGuidance?: boolean;
```

Enable GPU capability detection and guidance for this Procore viewer
instance. The embedding host evaluates its rollout flag (for example,
LaunchDarkly `dv-enable-bim-gpu-guidance`) and passes the resolved value.
Detection runs only on desktop web (`platform: Platform.Web`): mobile
flavors ignore this value. When off, detection does not run and no
guidance UI is shown.

###### Default

```ts
false
```

***

#### platform?

```ts
optional platform?: Platform;
```

Platform to use. Determines the UX flavor:
- Web: Use web dekstop UI layout (default)
- Android: Uses Android UI layout
- iOS: Use iOS UI layout

##### Default

```ts
Platform.Web
```

***

#### overlayElementsZIndex?

```ts
optional overlayElementsZIndex?: number;
```

Z-index value for portal-rendered overlay elements (tearsheets, modals,
tooltips).

This ensures Webviewer overlays appear above consumer application
content.

If you have no zIndex issues with Webviewer overlays, you can omit this.

**Resolution behavior:**
The maximum value is selected from:
1. This explicit value (if provided)
2. `useZIndexContext()` from `@procore/core-react`
3. Default minimum of 1050

This ensures overlays appear above all sources.

##### Default

```ts
1050 (minimum)
```

***

#### locale?

```ts
optional locale?: string;
```

Locale/language code to use for the viewer UI (e.g. `"en"`, `"de"`, `"fr"`, `"no"`, `"fi"`).

When provided, overrides the automatic browser language detection and sets the
i18next language. This affects all translated UI strings, date/number formatting,
and the `Accept-Language` header sent with API requests.

If omitted, the viewer falls back to automatic browser language detection
(via `i18next-browser-languagedetector`), then to English.

### InitOptionsAuth

```ts
type InitOptionsAuth = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
};
```

#### access\_token?

```ts
optional access_token?: string;
```

OAuth access token used to authorize backend calls.
Omit for anonymous scenes.

***

#### expires\_in?

```ts
optional expires_in?: number;
```

Seconds until `access_token` expires, as returned by the token endpoint.

***

#### refresh\_token?

```ts
optional refresh_token?: string;
```

OAuth refresh token used to obtain a new access token.
Silent refresh is only armed when this and `refresh_token_expires_in` are both set.

***

#### refresh\_token\_expires\_in?

```ts
optional refresh_token_expires_in?: number;
```

Seconds until `refresh_token` expires, as returned by the token endpoint.

### IntersectPointClickPayload

```ts
type IntersectPointClickPayload = [number, number, number];
```

Payload for the 'intersectPointClick' event.
Array with [x, y, z] coordinates of the pick.

### Line

```ts
type Line = Interactive<LineBase>;
```

### MarkerCollection

Public API for managing a collection of 3D markers.
This class acts as a facade over the Redux store, providing a clean interface
for CRUD operations, configuration, and visibility management.

#### addMarker()

```ts
addMarker(marker): void;
```

Adds a single marker to the collection.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) | The marker data to add |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### addMarkers()

```ts
addMarkers(markers): void;
```

Adds multiple markers to the collection in batch.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markers` | [`MarkerData`](#markerdata)[] | Array of marker data to add |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### removeMarker()

```ts
removeMarker(markerId): void;
```

Removes a single marker by ID.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markerId` | `string` | The ID of the marker to remove |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### removeMarkers()

```ts
removeMarkers(markerIds): void;
```

Removes multiple markers by ID.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markerIds` | `string`[] | Array of marker IDs to remove |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### clear()

```ts
clear(): void;
```

Removes all markers from the collection.

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### selectMarker()

```ts
selectMarker(markerId): void;
```

Selects the marker by ID. Dispatches to the redux store and triggers any logic provided through the config.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markerId` | `string` | ID of the marker to select |

##### Returns

`void`

##### Throws

Error if the collection has been disposed or the marker does not exist

***

#### deselectMarker()

```ts
deselectMarker(): void;
```

Deselects the currently selected marker if it belongs to this collection.
Dispatches to the redux store and triggers any logic provided through the config.
Does nothing if no marker is selected or if the selected marker belongs to a different collection.

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### updateMarker()

```ts
updateMarker(markerId, updates): void;
```

Updates an existing marker.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markerId` | `string` | ID of the marker to update |
| `updates` | `Partial`\<[`MarkerData`](#markerdata)\> | Partial marker data to merge |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### getMarkers()

```ts
getMarkers(): Marker[];
```

Retrieves all markers in the collection.
Returns defensive copies to prevent state mutation.

##### Returns

`Marker`[]

Array of markers

***

#### getMarker()

```ts
getMarker(markerId): Marker | null;
```

Retrieves a single marker by ID.
Returns a defensive copy to prevent state mutation.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `markerId` | `string` | ID of the marker |

##### Returns

`Marker` \| `null`

The marker or null if not found

***

#### startCreationFlow()

```ts
startCreationFlow(): MarkerCreationFlow;
```

Starts an interactive creation flow for this collection.

##### Returns

`MarkerCreationFlow`

Control object for the active flow

***

#### stopCreationFlow()

```ts
stopCreationFlow(): void;
```

Stops any active creation flow and triggers the onCancelled callback.

##### Returns

`void`

***

#### isVisible()

```ts
isVisible(): boolean;
```

Checks if the collection is currently visible.

##### Returns

`boolean`

***

#### getId()

```ts
getId(): string;
```

Gets the collection ID.

##### Returns

`string`

***

#### getConfig()

```ts
getConfig(): MarkerCollectionConfig;
```

Gets the current collection configuration.

##### Returns

[`MarkerCollectionConfig`](#markercollectionconfig)

***

#### getMarkerCreationFlowConfig()

```ts
getMarkerCreationFlowConfig(): MarkerCreationFlowConfig;
```

Gets the current marker creation configuration.

##### Returns

[`MarkerCreationFlowConfig`](#markercreationflowconfig)

***

#### show()

```ts
show(): void;
```

Shows the collection.

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### hide()

```ts
hide(): void;
```

Hides the collection.

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### toggleVisibility()

```ts
toggleVisibility(): void;
```

Toggles the collection visibility.

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### updateConfig()

```ts
updateConfig(config): void;
```

Updates the collection configuration.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Partial`\<[`MarkerCollectionConfig`](#markercollectionconfig)\> | Partial configuration to merge |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### updateMarkerCreationConfig()

```ts
updateMarkerCreationConfig(config): void;
```

Updates the marker creation configuration.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Partial`\<[`MarkerCreationFlowConfig`](#markercreationflowconfig)\> | Partial configuration to merge |

##### Returns

`void`

##### Throws

Error if the collection has been disposed

***

#### dispose()

```ts
dispose(): void;
```

Disposes the collection, removing it from the store.

##### Returns

`void`

### MarkerCollectionConfig

```ts
type MarkerCollectionConfig = {
  getPinColor?: (marker?) => string;
  getPinIcon?: (marker?) => MarkerIcon | null;
  getPinOpacity?: (marker?) => number;
  getMarkupBadge?: (marker?) => MarkerMarkupBadge;
  getHoverColor?: (marker?) => string;
  getHoverSize?: (marker?) => number;
  enableSurfaceHighlight?: boolean;
  getSelectedColor?: (marker?) => string;
  getSelectedSize?: (marker?) => number;
  onPointerEnter?: (marker, screenPosition?) => void | string;
  onPointerLeave?: (marker) => void;
  onSelect?: (marker, screenPosition?) => void;
  onDeselect?: (marker) => void;
  onLocationUpdated?: (marker, oldPosition) => void;
};
```

Configuration for a marker collection
All callbacks are optional - sensible defaults will be used
This is stored directly in Redux state (serializability checks are disabled for marker configs)

#### getPinColor?

```ts
optional getPinColor?: (marker?) => string;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`string`

***

#### getPinIcon?

```ts
optional getPinIcon?: (marker?) => MarkerIcon | null;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

[`MarkerIcon`](#markericon) \| `null`

***

#### getPinOpacity?

```ts
optional getPinOpacity?: (marker?) => number;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`number`

***

#### getMarkupBadge?

```ts
optional getMarkupBadge?: (marker?) => MarkerMarkupBadge;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

[`MarkerMarkupBadge`](#markermarkupbadge)

***

#### getHoverColor?

```ts
optional getHoverColor?: (marker?) => string;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`string`

***

#### getHoverSize?

```ts
optional getHoverSize?: (marker?) => number;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`number`

***

#### enableSurfaceHighlight?

```ts
optional enableSurfaceHighlight?: boolean;
```

Highlights the model object under the cursor while creating or moving a pin.

##### Default

```ts
true
```

***

#### getSelectedColor?

```ts
optional getSelectedColor?: (marker?) => string;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`string`

***

#### getSelectedSize?

```ts
optional getSelectedSize?: (marker?) => number;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker?` | [`MarkerData`](#markerdata) |

##### Returns

`number`

***

#### onPointerEnter?

```ts
optional onPointerEnter?: (marker, screenPosition?) => void | string;
```

Fires approximately 2 animation frames (~32ms at 60fps) after pointer
enter so enlarged DOM bounds can be measured accurately.

Very brief hovers (enter and leave within that window) intentionally
suppress both onPointerEnter and onPointerLeave to preserve pairing.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |
| `screenPosition?` | [`MarkerScreenPosition`](#markerscreenposition) |

##### Returns

`void` \| `string`

***

#### onPointerLeave?

```ts
optional onPointerLeave?: (marker) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |

##### Returns

`void`

***

#### onSelect?

```ts
optional onSelect?: (marker, screenPosition?) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |
| `screenPosition?` | [`MarkerScreenPosition`](#markerscreenposition) |

##### Returns

`void`

***

#### onDeselect?

```ts
optional onDeselect?: (marker) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |

##### Returns

`void`

***

#### onLocationUpdated?

```ts
optional onLocationUpdated?: (marker, oldPosition) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |
| `oldPosition` | [`vec3`](#vec3) |

##### Returns

`void`

### MarkerCreationFlowConfig

```ts
type MarkerCreationFlowConfig = {
  onCreated?: (marker) => void;
  onCancelled?: () => void;
  onError?: (error) => void;
  fadeOtherMarkers?: boolean;
  showPreview?: boolean;
  hideViewerUI?: boolean;
  generateId?: () => string;
};
```

#### onCreated?

```ts
optional onCreated?: (marker) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `marker` | [`MarkerData`](#markerdata) |

##### Returns

`void`

***

#### onCancelled?

```ts
optional onCancelled?: () => void;
```

##### Returns

`void`

***

#### onError?

```ts
optional onError?: (error) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

##### Returns

`void`

***

#### fadeOtherMarkers?

```ts
optional fadeOtherMarkers?: boolean;
```

***

#### showPreview?

```ts
optional showPreview?: boolean;
```

***

#### hideViewerUI?

```ts
optional hideViewerUI?: boolean;
```

***

#### generateId?

```ts
optional generateId?: () => string;
```

##### Returns

`string`

### MarkerData

```ts
type MarkerData = {
  id: string;
  position: ReadonlyVec3;
  metadata?: Record<string, unknown>;
};
```

Core marker data provided by third parties

#### id

```ts
id: string;
```

***

#### position

```ts
position: ReadonlyVec3;
```

***

#### metadata?

```ts
optional metadata?: Record<string, unknown>;
```

### MarkerIcon

```ts
type MarkerIcon = 
  | {
  shape: "pin" | "circle" | "square";
  icon?: string;
  size?: number;
  color?: string;
}
  | {
  svgContent: string;
  anchorOffset?: vec2;
  anchorOffsetCoordinateType?: "viewBox" | "screen";
};
```

Marker icon data
Allows for custom icons to be used for markers

#### Union Members

#### Type Literal

```ts
{
  shape: "pin" | "circle" | "square";
  icon?: string;
  size?: number;
  color?: string;
}
```

##### shape

```ts
shape: "pin" | "circle" | "square";
```

Built-in shape (fallback if no custom icon is provided)

##### icon?

```ts
optional icon?: string;
```

Icon as svg string. Should be defined with the same viewBox as `shape` (0 0 57 56)
Example: `<svg...><path d='...' /><circle cx='12' cy='9' r='3'/></svg>`

##### size?

```ts
optional size?: number;
```

Size in pixels (applied as scale transform)
Default: 34

##### color?

```ts
optional color?: string;
```

Override color (if not specified, uses collection color)

***

#### Type Literal

```ts
{
  svgContent: string;
  anchorOffset?: vec2;
  anchorOffsetCoordinateType?: "viewBox" | "screen";
}
```

##### svgContent

```ts
svgContent: string;
```

Custom full SVG content string.

When using `anchorOffset` with viewBox-coordinate scaling, this **must** be a complete
`<svg>` element that includes both a `viewBox` attribute and numeric `width`/`height`
attributes. The renderer parses these to convert the offset from viewBox units to
screen pixels.

If `svgContent` is a bare fragment (e.g. `<g>...</g>`) or an `<svg>` element that
is missing `viewBox` or `width`/`height`, the renderer cannot perform the conversion
and will fall back to treating the `anchorOffset` values as raw screen pixels (1:1
mapping, no scaling). In that case, omit `anchorOffset` entirely or supply it already
in screen-pixel units.

###### Examples

**Full SVG with viewBox — anchorOffset in viewBox coords, auto-scaled:**

```
svgContent: '<svg width="36" height="44" viewBox="0 0 57 56" ...>...</svg>'
anchorOffset: vec2.fromValues(-18, -54) // tip is at (18, 54) in viewBox space
```

**Bare fragment — anchorOffset treated as raw screen pixels:**

```
svgContent: '<g><path d="..." /><circle cx="12" cy="9" r="3"/></g>'
anchorOffset: vec2.fromValues(-8, -16) // already in pixels, no scaling applied
```

##### anchorOffset?

```ts
optional anchorOffset?: vec2;
```

Offset applied to the anchor position after projection to screen space.

How the values are interpreted is controlled by `anchorOffsetCoordinateType`:

- `"viewBox"` — values are in the SVG's viewBox coordinate space and are
  automatically scaled to screen pixels using `renderedWidth / viewBoxWidth`
  (and the same for height). Requires `svgContent` to be a full `<svg>` element
  with both `viewBox` and numeric `width`/`height` attributes. If those attributes
  are absent the renderer silently falls back to screen-pixel units.

- `"screen"` (default) — values are already in screen pixels; no scaling is applied.
  Use this when `svgContent` is a bare fragment (e.g. `<g>...</g>`) or when you have
  already converted the offset yourself.

In both cases a negative offset moves the rendered SVG towards the top-left, which
is the convention for aligning a visual feature (e.g. a pin tip) with the 3D point.

##### anchorOffsetCoordinateType?

```ts
optional anchorOffsetCoordinateType?: "viewBox" | "screen";
```

Declares the coordinate space of `anchorOffset`.

- `"viewBox"` — `anchorOffset` is in the SVG's own viewBox units; the renderer
  scales it to screen pixels automatically (requires a full `<svg viewBox="..."
  width="..." height="...">` root).
- `"screen"` — `anchorOffset` is already in screen pixels; no scaling is applied.

When omitted, the default is **inferred from `svgContent`**:
- `svgContent` starts with `<svg` → `"viewBox"` (preserves the pre-existing
  implicit behavior; the renderer can parse the root element for scaling).
- `svgContent` is a bare fragment (`<g>`, `<path>`, etc.) → `"screen"` (no SVG
  root to parse, so the renderer's 1:1 fallback is the only valid interpretation).

Supply an explicit value if the inferred default is not correct for your content.

### MarkerMarkupBadge

```ts
type MarkerMarkupBadge = boolean;
```

Configuration for the markup badge displayed on marker pins
Set to true to show the default badge, false to hide it.

#### Remarks

Future versions may support custom badge SVGs. This will require
a breaking change from boolean to an object type.

### MarkerScreenPosition

```ts
type MarkerScreenPosition = {
  x: number;
  y: number;
  depth: number;
  bounds: MarkerBounds;
  enlargedBounds?: MarkerBounds;
};
```

Screen-space position and bounding box of a marker element, relative to the canvas.

#### x

```ts
x: number;
```

***

#### y

```ts
y: number;
```

***

#### depth

```ts
depth: number;
```

***

#### bounds

```ts
bounds: MarkerBounds;
```

***

#### enlargedBounds?

```ts
optional enlargedBounds?: MarkerBounds;
```

Bounds of the marker in its active enlarged state, measured from the DOM
after the hover/selected SVG re-render commits (~2 animation frames after
the pointer event). Reflects whichever scale is currently rendered:
hover scale, or selected scale if the marker is already selected.

May be undefined if the marker left the DOM before measurement completed.

### ObjectAddedToSelectionPayload

Payload for the 'objectAddedToSelection' event.

#### objectId

```ts
objectId: string;
```

The ID of the object that was added to the selection.

***

#### ~~objectBbox?~~

```ts
optional objectBbox?: AABB3;
```

The bounding box of the object that was added to the selection.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

### ObjectRemovedFromSelectionPayload

Payload for the 'objectRemovedFromSelection' event.

#### objectId

```ts
objectId: string;
```

The ID of the object that was removed from the selection.

***

#### ~~objectBbox?~~

```ts
optional objectBbox?: AABB3;
```

The bounding box of the object that was removed from the selection.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

### ObjectsAddedToSelectionPayload

Payload for the 'objectsAddedToSelection' event.

#### objectIds

```ts
objectIds: string[];
```

The IDs of the objects that were added to the selection.

***

#### ~~objectsBbox?~~

```ts
optional objectsBbox?: AABB3;
```

The combined bounding box of the objects that were added to the selection.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

### ObjectsRemovedFromSelectionPayload

Payload for the 'objectsRemovedFromSelection' event.

#### objectIds

```ts
objectIds: string[];
```

The IDs of the objects that were removed from the selection.

***

#### ~~objectsBbox?~~

```ts
optional objectsBbox?: AABB3;
```

The combined bounding box of the objects that were removed from the selection.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

### OfflineDownloadErrorCode

```ts
type OfflineDownloadErrorCode = "quotaExceeded" | "offline" | "downloadFailed" | "unknown";
```

Machine-readable counterpart of [OfflineDownloadStatusPayload.error](#offlinedownloadstatuspayload), for a host that
needs to pick its own copy rather than show the viewer's.

### OfflineDownloadStatus

```ts
type OfflineDownloadStatus = 
  | "scanning"
  | "synchronizing"
  | "synchronized"
  | "deleting"
  | "deleted"
  | "aborted"
  | "error";
```

Where offline work on a scene has got to.

A curated set rather than a mirror of the offline SDK's `logger.status(...)` strings: the SDK
statuses that only say a failure happened (`"offline"`, `"invalid format"`) arrive here as
`"error"` with an [OfflineDownloadErrorCode](#offlinedownloaderrorcode), and the ones with nothing in them for a host
are dropped. `"deleting"` and `"deleted"` are reported by the viewer rather than the SDK.

### OfflineDownloadStatusPayload

Payload for the 'offlineDownloadStatus' event.

Reports where the offline work on a scene has got to, so a native host can show its own download
indicator instead of the in-viewer one. Only status changes are reported; there are no byte counts
or completion fraction.

Covers the work a user asked for — a full download or a delete. The incremental caching that runs
on load is invisible to the host.

Every failure arrives as a single `"error"` event carrying an `errorCode`; no other status means
the work failed.

Subscribe-only, with no snapshot for late subscribers: a host that subscribes mid-download gets
nothing until the next status change, and nothing at all if the work has already finished.

#### sceneId

```ts
sceneId: string;
```

The viewer scene open while this was reported. An offline copy is stored per project and can
serve several scenes, so this identifies the viewer session rather than what the work covers.

***

#### sceneVersionId?

```ts
optional sceneVersionId?: string;
```

The version of [OfflineDownloadStatusPayload.sceneId](#sceneid), when the host provided one.

***

#### source

```ts
source: "delete" | "fullSync";
```

Which offline work this reports on: the user-initiated full download, or removal of the
offline copy. The background incremental caching that runs on load is not reported.

***

#### status

```ts
status: OfflineDownloadStatus;
```

Where the work currently is. A full sync runs `"scanning"` → `"synchronizing"` →
`"synchronized"`, and a delete runs `"deleting"` → `"deleted"`. Either ends as `"error"` on a
failure, or a sync as `"aborted"` on a user pause.

***

#### error?

```ts
optional error?: string;
```

Message describing the failure, localized to the *viewer's* locale, not the host's. Only on
`"error"`, and only where the viewer has copy that fits — a failed delete reports the code
alone. Prefer `errorCode`.

***

#### errorCode?

```ts
optional errorCode?: OfflineDownloadErrorCode;
```

Why the work failed. Always on `"error"`.

### OrthogonalCamera

#### position

```ts
position: ReadonlyVec3;
```

***

#### direction

```ts
direction: ReadonlyVec3;
```

***

#### camera\_up

```ts
camera_up: ReadonlyVec3;
```

***

#### vertical\_extent

```ts
vertical_extent: number;
```

***

#### aspect\_ratio

```ts
aspect_ratio: number;
```

Width / height

***

#### target\_distance

```ts
target_distance: number;
```

### Palette

```ts
type Palette = {
  default?: Color;
  xray?: Color;
  selected?: Color;
};
```

Colors an object is drawn with, per render mode. Omitted modes keep their scene colors.

#### default?

```ts
optional default?: Color;
```

Color used in normal render mode.

***

#### xray?

```ts
optional xray?: Color;
```

Color used in X-Ray render mode.

***

#### selected?

```ts
optional selected?: Color;
```

Color used while the object is selected.

### PaletteParams

```ts
type PaletteParams = {
  palette: Palette;
  publicIds: PublicId[];
};
```

A palette together with the objects it applies to.

#### palette

```ts
palette: Palette;
```

Colors to draw the objects with.

***

#### publicIds

```ts
publicIds: PublicId[];
```

Public IDs of the objects to apply the palette to.

### PerspectiveCamera

#### position

```ts
position: ReadonlyVec3;
```

***

#### direction

```ts
direction: ReadonlyVec3;
```

***

#### camera\_up

```ts
camera_up: ReadonlyVec3;
```

***

#### fov

```ts
fov: number;
```

Degrees

***

#### aspect\_ratio

```ts
aspect_ratio: number;
```

Width / height

### PickingResult

Result of a committed pick (see [StartPickingOptions](#startpickingoptions)).

#### Extends

- [`PickingResultData`](#pickingresultdata)

#### position

```ts
position: ReadonlyVec3;
```

The snapped world-space coordinate (or the raw hit position when `snapType` is `"none"`).

##### Inherited from

[`PickingResultData`](#pickingresultdata).[`position`](#pickingresultdata)

***

#### normal

```ts
normal: ReadonlyVec3;
```

Surface normal at the raw `view.pick()` hit location. Only meaningful when `snapType` is
`"none"` (a plain surface pick); for snapped features (vertex/corner/edge/etc.) it is just the
normal under the cursor and does not describe the snapped feature itself.

##### Inherited from

[`PickingResultData`](#pickingresultdata).[`normal`](#pickingresultdata)

***

#### snapType

```ts
snapType: PickingSnapType;
```

##### Inherited from

[`PickingResultData`](#pickingresultdata).[`snapType`](#pickingresultdata)

***

#### internalObjectId

```ts
internalObjectId: number | null;
```

Internal object id of the picked geometry, or `null` when none.

##### Inherited from

[`PickingResultData`](#pickingresultdata).[`internalObjectId`](#pickingresultdata)

***

#### adjacentVertices?

```ts
optional adjacentVertices?: ReadonlyVec3[];
```

World-space positions of the vertices adjacent to the snapped feature. Populated for
`"corner"` (the neighboring vertices of the edges meeting at the corner) and for
`"tangent"` / `"midpoint"` (the two endpoints of the snapped edge). `undefined` for other
snap types, and an empty array when the adjacent geometry is not a straight edge (e.g. arcs).

##### Inherited from

[`PickingResultData`](#pickingresultdata).[`adjacentVertices`](#pickingresultdata)

#### getObjectId()

```ts
getObjectId(): Promise<string | null>;
```

Lazily resolve the internal [PickingResultData.internalObjectId](#internalobjectid) to its external
(public) object id. Resolution can hit the network, so it runs only on demand and the result
is cached after the first call. Resolves to `null` when there is no picked object
(`internalObjectId` is `null`) or the object has no external id.

##### Returns

`Promise`\<`string` \| `null`\>

### PickingResultData

Raw pick data produced by the picking session, before external-id resolution is attached.
This is what `onHover` receives; a committed pick resolves to the richer [PickingResult](#pickingresult).

#### Extended by

- [`PickingResult`](#pickingresult)

#### position

```ts
position: ReadonlyVec3;
```

The snapped world-space coordinate (or the raw hit position when `snapType` is `"none"`).

***

#### normal

```ts
normal: ReadonlyVec3;
```

Surface normal at the raw `view.pick()` hit location. Only meaningful when `snapType` is
`"none"` (a plain surface pick); for snapped features (vertex/corner/edge/etc.) it is just the
normal under the cursor and does not describe the snapped feature itself.

***

#### snapType

```ts
snapType: PickingSnapType;
```

***

#### internalObjectId

```ts
internalObjectId: number | null;
```

Internal object id of the picked geometry, or `null` when none.

***

#### adjacentVertices?

```ts
optional adjacentVertices?: ReadonlyVec3[];
```

World-space positions of the vertices adjacent to the snapped feature. Populated for
`"corner"` (the neighboring vertices of the edges meeting at the corner) and for
`"tangent"` / `"midpoint"` (the two endpoints of the snapped edge). `undefined` for other
snap types, and an empty array when the adjacent geometry is not a straight edge (e.g. arcs).

### PickingSnapKey

```ts
type PickingSnapKey = Exclude<keyof SnapTolerance, "face">;
```

Snap types that can be enabled for a picking session. `face` is intentionally excluded: since we
pick a single point, snapping to a face is equivalent to the raw surface hit (`snapType: "none"`).

### PickingSnapType

```ts
type PickingSnapType = "vertex" | "corner" | "tangent" | "midpoint" | "normal" | "none";
```

The kind of geometric feature a pick was snapped to.
`"none"` means the pick landed on a plain surface with no snap.

### Platform

#### Web

```ts
Web: "web";
```

***

#### Android

```ts
Android: "android";
```

***

#### iOS

```ts
iOS: "ios";
```

### PositionPreset

```ts
type PositionPreset = "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
```

### ProcoreClippingPlane

```ts
type ProcoreClippingPlane = {
  location: Vector3;
  direction: Vector3;
  unit?: string;
};
```

Procore format for a clipping plane.

#### location

```ts
location: Vector3;
```

A point on the clipping plane

***

#### direction

```ts
direction: Vector3;
```

The normal direction of the clipping plane

***

#### ~~unit?~~

```ts
optional unit?: string;
```

##### Deprecated

Legacy unit field. Kept for backward compatibility, but ignored because
section planes are expected to always be in meters.

### ProjectSettingsUpdatedPayload

Payload for the 'projectSettingsUpdated' event.

#### displayUnits

```ts
displayUnits: DisplayUnit;
```

The current display units.

### PropertiesObject

```ts
type PropertiesObject = {
  type: ObjectData["type"];
  id: string;
  fileName?: string;
  base: [string, string][];
  grouped: Record<string, {
     name: string;
     properties: [string, string][];
  }>;
  parent?: PropertiesObject;
  parentObjectData?: ObjectData;
};
```

#### type

```ts
type: ObjectData["type"];
```

***

#### id

```ts
id: string;
```

***

#### fileName?

```ts
optional fileName?: string;
```

Name of the file containing this object, e.g. in a federated model where each
top-level node under the root is a separate file. `undefined` when the object's
path has no recognizable file node (e.g. a single, non-federated model).

***

#### base

```ts
base: [string, string][];
```

***

#### grouped

```ts
grouped: Record<string, {
  name: string;
  properties: [string, string][];
}>;
```

***

#### parent?

```ts
optional parent?: PropertiesObject;
```

***

#### parentObjectData?

```ts
optional parentObjectData?: ObjectData;
```

### PropertiesTabConfig

#### id

```ts
id: string;
```

***

#### label

```ts
label: string;
```

***

#### component

```ts
component: ComponentType<PropertiesTabProps>;
```

### PropertiesTabEntry

#### config

```ts
config: PropertiesTabConfig;
```

### PropertiesTabProps

#### object?

```ts
optional object?: PropertiesObject | null;
```

***

#### hasAccess

```ts
hasAccess: boolean;
```

***

#### searchTerm

```ts
searchTerm: string;
```

***

#### isSearchActive

```ts
isSearchActive: boolean;
```

***

#### onEmptyStateChange?

```ts
optional onEmptyStateChange?: (isEmpty) => void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `isEmpty` | `boolean` |

##### Returns

`void`

### PublicId

```ts
type PublicId = string;
```

Public identifier of an object in the model, as used by the `model` namespace APIs.

### RadiusEllipse

```ts
type RadiusEllipse = Interactive<RadiusEllipseBase>;
```

### ReadonlyVec3

```ts
type ReadonlyVec3 = [number, number, number];
```

### Rect

```ts
type Rect = Interactive<RectBase>;
```

### RelativeToElementId

#### elementId

```ts
elementId: string;
```

***

#### placement?

```ts
optional placement?: "top" | "bottom" | "left" | "right";
```

***

#### offset?

```ts
optional offset?: {
  x?: number;
  y?: number;
};
```

##### x?

```ts
optional x?: number;
```

##### y?

```ts
optional y?: number;
```

***

#### align?

```ts
optional align?: {
  horizontal?: "center" | "left" | "right";
  vertical?: "center" | "top" | "bottom";
};
```

##### horizontal?

```ts
optional horizontal?: "center" | "left" | "right";
```

##### vertical?

```ts
optional vertical?: "center" | "top" | "bottom";
```

### RenderStateCamera

Camera related render state.

#### kind

```ts
readonly kind: "pinhole" | "orthographic";
```

The type of camera projection to use.

##### See

[pinhole](https://en.wikipedia.org/wiki/Pinhole_camera_model)
[orthographic](https://en.wikipedia.org/wiki/Orthographic_projection)

***

#### position

```ts
readonly position: ReadonlyVec3;
```

Camera position in world space.

***

#### rotation

```ts
readonly rotation: ReadonlyQuat;
```

Camera rotation in world space.

##### Remarks

This rotation is from camera->world space, much like that of a local->world space transformation of any rendered object.
It should not be confused with the inverse transformation, i.e. world->camera space, commonly used in shaders.

***

#### pivot

```ts
readonly pivot: ReadonlyVec3 | undefined;
```

Camera pivot point in world space.

##### Remarks

This is used to visualize a point around which the camera will pivot when moved.
(Currently not implemented)

***

#### fov

```ts
readonly fov: number;
```

Camera's vertical field of view.

##### Remarks

For pinhole cameras, this value is interpreted as the angle between the top and bottom edge of the frustum in degrees.
For orthographic cameras, this value is interpreted as the distance between the top and bottom edge of the view frustum in meters.

***

#### near

```ts
readonly near: number;
```

Camera's near clipping plane distance.

##### Remarks

This value must be larger than 0, preferable as large as it can comfortable be without excessive visual clipping artifacts.
Any pixels that are closer to the image plane will be clipped.
Larger values will greatly improve z-buffer resolution,
which helps reduce [z-fighting](https://en.wikipedia.org/wiki/Z-fighting).

***

#### far

```ts
readonly far: number;
```

Camera's far clipping plane distance.

##### Remarks

This value must be larger than the [near](#near) clipping plane.
Any pixels that are farther away from the image plane will be clipped.
Smaller values improves z-buffer resolution, which helps reduce [z-fighting](https://en.wikipedia.org/wiki/Z-fighting).
Smaller values also increases the # objects culled, which could help improve rendering performance.

### SceneStatusPayload

```ts
type SceneStatusPayload = AsyncState<void>;
```

Payload for the sceneStatus event.
Contains the current status of the scene loading.

### SelectionChangedPayload

Payload for the 'selectionChanged' event.

#### selectedObjects

```ts
selectedObjects: string[];
```

The current selection after the change.

***

#### ~~selectedObjectsBbox?~~

```ts
optional selectedObjectsBbox?: AABB3;
```

The bounding box of the selected objects.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

***

#### previousSelection

```ts
previousSelection: string[];
```

The selection before the change.

***

#### ~~previousSelectionBbox?~~

```ts
optional previousSelectionBbox?: AABB3;
```

The bounding box of the previous selection.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

***

#### addedObjects

```ts
addedObjects: string[];
```

Objects that were added to the selection.

***

#### ~~addedObjectsBbox?~~

```ts
optional addedObjectsBbox?: AABB3;
```

The bounding box of the added objects.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

***

#### removedObjects

```ts
removedObjects: string[];
```

Objects that were removed from the selection.

***

#### ~~removedObjectsBbox?~~

```ts
optional removedObjectsBbox?: AABB3;
```

The bounding box of the removed objects.

##### Deprecated

Use `webviewer.model.getObjectsBounds` instead.

### SetViewpointOptions

Options for applying a viewpoint with `setViewpoint`.

#### ignoreUndefined?

```ts
optional ignoreUndefined?: boolean;
```

When true, fields that are `undefined` on the payload are skipped instead of being
reset to their default/empty state. This allows applying a partial viewpoint update.

##### Default

```ts
false
```

### SetViewpointPayload

```ts
type SetViewpointPayload = Omit<Viewpoint, "id" | "name" | "grouping" | "unit" | "snapshot" | "camera"> & {
  id?: Viewpoint["id"];
  name?: Viewpoint["name"];
  camera?: Camera;
  cameraFlyTime?: number;
};
```

#### Type Declaration

#### id?

```ts
optional id?: Viewpoint["id"];
```

When set (with optional id), included in the viewpointChanged event as viewpoint.id / viewpoint.name.

#### name?

```ts
optional name?: Viewpoint["name"];
```

#### camera?

```ts
optional camera?: Camera;
```

Camera is required for normal usage. When the `ignoreUndefined` option is used with
 `webviewer.model.setViewpoint`, this can be omitted to skip camera updates.

#### cameraFlyTime?

```ts
optional cameraFlyTime?: number;
```

### SlottedWindow

```ts
const SlottedWindow: (__namedParameters) => Element & {
  HeaderRow: typeof HeaderRow;
  Title: typeof Title;
  BackButton: typeof BackButton;
  TabsRow: typeof TabsRow;
  SubheaderRow: typeof SubheaderRow;
  BulkActionsRow: typeof BulkActionsRow;
  SearchInput: typeof SearchInput;
};
```

#### Type Declaration

#### HeaderRow

```ts
HeaderRow: typeof HeaderRow;
```

#### Title

```ts
Title: typeof Title;
```

#### BackButton

```ts
BackButton: typeof BackButton;
```

#### TabsRow

```ts
TabsRow: typeof TabsRow;
```

#### SubheaderRow

```ts
SubheaderRow: typeof SubheaderRow;
```

#### BulkActionsRow

```ts
BulkActionsRow: typeof BulkActionsRow;
```

#### SearchInput

```ts
SearchInput: typeof SearchInput;
```

### SnapTolerance

Tolerance for picking and snapping to parametric objects, numbers are distance in meters
0 can be used to ignore certain types when picking or snapping

#### segment?

```ts
optional segment?: number;
```

***

#### edge?

```ts
optional edge?: number;
```

***

#### face?

```ts
optional face?: number;
```

***

#### point?

```ts
optional point?: number;
```

***

#### edgeMidpoint?

```ts
optional edgeMidpoint?: number;
```

***

#### arcCenter?

```ts
optional arcCenter?: number;
```

### StartPickingOptions

Options for a `startPicking` session.

#### snapTolerance?

```ts
optional snapTolerance?: Pick<SnapTolerance, PickingSnapKey>;
```

Per-type snap tolerances for the snap types enabled via [StartPickingOptions.snapTo](#snapto).
A type without an entry here falls back to the same default as the PointLine measure tool.
Ignored for snap types that are not enabled.

***

#### snapTo?

```ts
optional snapTo?: Partial<Record<PickingSnapKey, boolean>>;
```

Allowlist of snap types to consider. Every snap type is disabled by default; set a type to
`true` to enable it. With no `snapTo`, nothing snaps and every pick resolves as `"none"`.

Note on edges: the engine snaps to straight edges via `segment` and to curved edges via
`edge`, so enable both to snap to all edges.

***

#### onHover?

```ts
optional onHover?: (info) => void;
```

Called on every hover update with the current snap target, or `null` when there is none.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `info` | [`PickingResultData`](#pickingresultdata) \| `null` |

##### Returns

`void`

***

#### abortSignal?

```ts
optional abortSignal?: AbortSignal;
```

Abort the session. The `startPicking` promise rejects with an `AbortError`.

### Subtree

```ts
type Subtree = keyof Subtrees;
```

Name of one geometry kind, e.g. `"triangles"`.

### Subtrees

```ts
type Subtrees = {
  triangles: SubtreeStatus;
  lines: SubtreeStatus;
  terrain: SubtreeStatus;
  points: SubtreeStatus;
  documents: SubtreeStatus;
};
```

Visibility of each geometry kind in the scene. A kind the loaded scene does not contain
is `Unavailable` rather than `Hidden`.

#### triangles

```ts
triangles: SubtreeStatus;
```

Meshed surfaces.

***

#### lines

```ts
lines: SubtreeStatus;
```

Line geometry.

***

#### terrain

```ts
terrain: SubtreeStatus;
```

Terrain surfaces.

***

#### points

```ts
points: SubtreeStatus;
```

Point clouds.

***

#### documents

```ts
documents: SubtreeStatus;
```

2D documents placed in the scene.

### SubtreeStatus

#### Unavailable

```ts
Unavailable: "unavailable";
```

***

#### Shown

```ts
Shown: "shown";
```

***

#### Hidden

```ts
Hidden: "hidden";
```

### SvgContent

```ts
type SvgContent = Interactive<SvgContentBase>;
```

### SvgData

```ts
type SvgData = {
  ellipses?: (BoxEllipse | RadiusEllipse)[];
  lines?: Line[];
  arrows?: Arrow[];
  texts?: Text[];
  rects?: Rect[];
  svgContents?: SvgContent[];
};
```

#### ellipses?

```ts
optional ellipses?: (BoxEllipse | RadiusEllipse)[];
```

***

#### lines?

```ts
optional lines?: Line[];
```

***

#### arrows?

```ts
optional arrows?: Arrow[];
```

***

#### texts?

```ts
optional texts?: Text[];
```

***

#### rects?

```ts
optional rects?: Rect[];
```

***

#### svgContents?

```ts
optional svgContents?: SvgContent[];
```

### Text

```ts
type Text = Interactive<TextBase>;
```

### ToolbarButtonConfig

```ts
type ToolbarButtonConfig = ToolbarEntryCommon & {
  separator?: false;
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  ref?: React.Ref<HTMLButtonElement>;
  hasExpander?: boolean;
  expanderPosition?: "bottom-left" | "bottom-right";
  component?: React.ComponentType<any>;
  tooltip?: TooltipConfig;
};
```

A regular, interactive toolbar button. This is the `separator: false`
variant of the ToolbarButtonConfig discriminated union.

#### Type Declaration

#### separator?

```ts
optional separator?: false;
```

#### icon

```ts
icon: ReactNode;
```

#### onClick?

```ts
optional onClick?: () => void;
```

##### Returns

`void`

#### title?

```ts
optional title?: string;
```

#### ref?

```ts
optional ref?: React.Ref<HTMLButtonElement>;
```

Optional ref to attach to the button element

#### hasExpander?

```ts
optional hasExpander?: boolean;
```

Shows a small expander icon in a corner
Useful for buttons that open menus or have subactions

#### expanderPosition?

```ts
optional expanderPosition?: "bottom-left" | "bottom-right";
```

Position of the expander icon. Defaults to "bottom-right"

#### component?

```ts
optional component?: React.ComponentType<any>;
```

Optional custom component to render instead of DefaultIconButton.
When provided, the component will receive onClick, title, and children (icon) props.
The component should be compatible with these props but can accept additional ones.

#### tooltip?

```ts
optional tooltip?: TooltipConfig;
```

Tooltip configuration for rich tooltips with keyboard shortcuts

### ToolbarButtonEntry

```ts
type ToolbarButtonEntry = {
  config: ToolbarEntryConfig;
  state: ToolbarButtonState;
};
```

#### config

```ts
config: ToolbarEntryConfig;
```

***

#### state

```ts
state: ToolbarButtonState;
```

### ToolbarButtonState

```ts
type ToolbarButtonState = {
  active: boolean;
  disabled: boolean;
  visible: boolean;
};
```

#### active

```ts
active: boolean;
```

***

#### disabled

```ts
disabled: boolean;
```

***

#### visible

```ts
visible: boolean;
```

### ToolbarEntryCommon

```ts
type ToolbarEntryCommon = {
  id: string;
  position?: number;
};
```

Fields shared by every toolbar entry, regardless of kind.

#### id

```ts
id: string;
```

***

#### position?

```ts
optional position?: number;
```

### ToolbarEntryConfig

```ts
type ToolbarEntryConfig = 
  | ToolbarButtonConfig
  | ToolbarSeparatorConfig;
```

Discriminated union of everything that can live in a toolbar's order.

### TooltipConfig

#### shortcutKey

```ts
shortcutKey: string;
```

***

#### toolName

```ts
toolName: string;
```

***

#### label?

```ts
optional label?: string;
```

Pre-translated display text. When provided, skips the i18n lookup.

***

#### alwaysVisible?

```ts
optional alwaysVisible?: boolean;
```

***

#### placement?

```ts
optional placement?: "top" | "bottom" | "left" | "right";
```

***

#### showOnHover?

```ts
optional showOnHover?: boolean;
```

When true, the tooltip is shown based on hovering the individual button
instead of the column/area-level hover used by standard toolbars.

### UnitType

#### length

```ts
length: "length";
```

***

#### area

```ts
area: "area";
```

***

#### volume

```ts
volume: "volume";
```

***

#### angle

```ts
angle: "angle";
```

### UomUnit

#### m

```ts
m: "m";
```

***

#### m2

```ts
m2: "m2";
```

***

#### m3

```ts
m3: "m3";
```

***

#### mm

```ts
mm: "mm";
```

***

#### mm2

```ts
mm2: "mm2";
```

***

#### mm3

```ts
mm3: "mm3";
```

***

#### ft

```ts
ft: "ft";
```

***

#### ft2

```ts
ft2: "ft2";
```

***

#### ft3

```ts
ft3: "ft3";
```

***

#### in

```ts
in: "in";
```

***

#### uin

```ts
uin: "uin";
```

***

#### uin2

```ts
uin2: "uin2";
```

***

#### uin3

```ts
uin3: "uin3";
```

***

#### deg

```ts
deg: "deg";
```

***

#### rad

```ts
rad: "rad";
```

***

#### mil

```ts
mil: "mil";
```

***

#### mil2

```ts
mil2: "mil2";
```

***

#### mil3

```ts
mil3: "mil3";
```

***

#### um

```ts
um: "um";
```

***

#### um2

```ts
um2: "um2";
```

***

#### um3

```ts
um3: "um3";
```

### vec2

```ts
type vec2 = [number, number];
```

### vec3

```ts
type vec3 = [number, number, number];
```

### Vector3

```ts
type Vector3 = 
  | vec3
  | {
  x: number;
  y: number;
  z: number;
};
```

### ViewerReadyPayload

Payload for the 'viewerReady' event.

#### timestamp

```ts
timestamp: number;
```

The time (in ms since epoch) when the viewer became ready.

***

#### viewerId?

```ts
optional viewerId?: string;
```

Optional identifier for the viewer instance.

### ViewerTerminatedPayload

Payload for the 'viewerTerminated' event.

#### timestamp

```ts
timestamp: number;
```

The time (in ms since epoch) when the viewer was terminated.

***

#### viewerId?

```ts
optional viewerId?: string;
```

Optional identifier for the viewer instance.

***

#### reason?

```ts
optional reason?: string;
```

Optional reason for termination.

### Viewpoint

#### id

```ts
id: string;
```

***

#### name?

```ts
optional name?: string;
```

***

#### grouping?

```ts
optional grouping?: string;
```

***

#### unit?

```ts
optional unit?: "meters";
```

***

#### render\_mode?

```ts
optional render_mode?: RenderMode;
```

***

#### snapshot?

```ts
optional snapshot?: Snapshot;
```

***

#### camera

```ts
camera: Camera;
```

***

#### clipping?

```ts
optional clipping?: Clipping;
```

***

#### markup?

```ts
optional markup?: undefined;
```

***

#### visibility?

```ts
optional visibility?: Visibility;
```

***

#### ~~selection?~~

```ts
optional selection?: string[];
```

##### Deprecated

Selection is no longer part of a viewpoint: `getViewpoint` never populates this
field and `setViewpoint` ignores it. Use `visibility` to control which objects are shown.

***

#### groups?

```ts
optional groups?: GroupVisibility[];
```

***

#### measurements?

```ts
optional measurements?: Measurements;
```

### ViewpointChangedPayload

Payload for the viewpointChanged event.
Emitted when a viewpoint is applied (setViewpoint hook / model.setViewpoint)
or when user interacts with the viewer after a viewpoint was applied.

#### viewpoint

```ts
viewpoint: 
  | {
  id?: string;
  name?: string;
}
  | null;
```

The viewpoint after this change; null when none.

***

#### prevViewpoint

```ts
prevViewpoint: 
  | {
  id?: string;
  name?: string;
}
  | null;
```

The previously installed viewpoint; null when none.

***

#### appliedBy

```ts
appliedBy: "initialization" | "set-viewpoint" | "viewer-interaction";
```

The source of the viewpoint change.

### ViewResetPayload

Payload for the 'viewReset' event.

#### timestamp

```ts
timestamp: number;
```

The time (in ms since epoch) when the view was reset.

***

#### sceneId

```ts
sceneId: string;
```

ID of the scene associated with the view reset, if applicable.

***

#### cameraReset

```ts
cameraReset: boolean;
```

Whether the camera position was reset as part of this view reset.

### VISIBILITY_TOOLBAR_IDS

```ts
const VISIBILITY_TOOLBAR_IDS: {
  DETAILS: "details";
  QUICK_ACCESS: "quick-access";
  NAV_WHEEL: "nav-wheel";
  ADVANCED_FEATURES: "advanced-features-menu";
};
```

All toolbar IDs that can be shown or hidden via `configureToolbarVisibility` / `setToolbarVisible`.

This is a superset of [CORE\_TOOLBAR\_IDS](#core_toolbar_ids):
- `DETAILS` is a managed toolbar and also supports visibility control.
- `QUICK_ACCESS` and `NAV_WHEEL` are visibility-only — they are not managed
  toolbars and do not support button APIs.

#### Type Declaration

#### DETAILS

```ts
readonly DETAILS: "details" = "details";
```

#### QUICK\_ACCESS

```ts
readonly QUICK_ACCESS: "quick-access" = "quick-access";
```

#### NAV\_WHEEL

```ts
readonly NAV_WHEEL: "nav-wheel" = "nav-wheel";
```

#### ADVANCED\_FEATURES

```ts
readonly ADVANCED_FEATURES: "advanced-features-menu" = "advanced-features-menu";
```

### VisibilityToolbarId

```ts
type VisibilityToolbarId = typeof VISIBILITY_TOOLBAR_IDS[keyof typeof VISIBILITY_TOOLBAR_IDS];
```

### WebviewerEventCallback

```ts
type WebviewerEventCallback<E> = (payload) => void | Promise<void>;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `E` *extends* [`WebviewerEventName`](#webviewereventname) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | [`WebviewerEventMap`](#webviewereventmap)\[`E`\] |

#### Returns

`void` \| `Promise`\<`void`\>

### WebviewerEventMap

Event map for type safety
Maps event names to their payload types

#### viewerReady

```ts
viewerReady: ViewerReadyPayload;
```

***

#### viewerTerminated

```ts
viewerTerminated: ViewerTerminatedPayload;
```

***

#### selectionChanged

```ts
selectionChanged: SelectionChangedPayload;
```

***

#### objectAddedToSelection

```ts
objectAddedToSelection: ObjectAddedToSelectionPayload;
```

***

#### objectRemovedFromSelection

```ts
objectRemovedFromSelection: ObjectRemovedFromSelectionPayload;
```

***

#### objectsAddedToSelection

```ts
objectsAddedToSelection: ObjectsAddedToSelectionPayload;
```

***

#### objectsRemovedFromSelection

```ts
objectsRemovedFromSelection: ObjectsRemovedFromSelectionPayload;
```

***

#### viewReset

```ts
viewReset: ViewResetPayload;
```

***

#### projectSettingsUpdated

```ts
projectSettingsUpdated: ProjectSettingsUpdatedPayload;
```

***

#### intersectPointClick

```ts
intersectPointClick: 
  | IntersectPointClickPayload
  | null;
```

***

#### cameraUpdated

```ts
cameraUpdated: RenderStateCamera;
```

***

#### cameraSettled

```ts
cameraSettled: RenderStateCamera;
```

***

#### appResize

```ts
appResize: AppResizePayload;
```

***

#### sceneStatus

```ts
sceneStatus: SceneStatusPayload;
```

***

#### viewpointChanged

```ts
viewpointChanged: ViewpointChangedPayload;
```

***

#### windowStateChanged

```ts
windowStateChanged: WindowStateChangedPayload;
```

***

#### offlineDownloadStatus

```ts
offlineDownloadStatus: OfflineDownloadStatusPayload;
```

### WebviewerEventName

```ts
type WebviewerEventName = keyof WebviewerEventMap;
```

### WindowPosition

```ts
type WindowPosition = 
  | PositionPreset
  | {
  x: number;
  y: number;
}
  | RelativeToElementId;
```

### WindowStateChangedPayload

Payload for the 'windowStateChanged' event.

#### windowId

```ts
windowId: string;
```

The ID of the window whose state changed.

***

#### open

```ts
open: boolean;
```

Whether the window is now open or closed.
