---
permalink: /bim-web-viewer
title: 'Procore BIM Web Viewer: Integrator Documentation'
layout: default
section_title: BIM Web Viewer
---

<!-- markdownlint-disable no-inline-html -->

## Getting started

<p class="heading-link-container"><a class="heading-link" href="#getting-started"></a></p>

### Installation from NPM (recommended)

<p class="heading-link-container"><a class="heading-link" href="#installation-from-npm-recommended"></a></p>

![npm version](https://img.shields.io/npm/v/@procore/bim-webviewer-sdk?color=%23f47e42)

The Procore BIM Web Viewer is available as a module on `npm` as [`@procore/bim-webviewer-sdk`](https://www.npmjs.com/package/@procore/bim-webviewer-sdk).

To install it, open a terminal window in your project folder and run:

```sh
npm install @procore/bim-webviewer-sdk
```

### Installation from a CDN

<p class="heading-link-container"><a class="heading-link" href="#installation-from-a-cdn"></a></p>

Though not recommended for production use, if you just want to prototype something you can use a tool like [`unpkg`](https://unpkg.com/) to get the module onto a page without the overhead of a build-system. Note we do not control `unpkg` and do not otherwise host the package on a publicly available CDN with uptime guarantees.

```html
<script src="https://unpkg.com/@procore/bim-webviewer-sdk"></script>
```

### Installation by Saving the File

<p class="heading-link-container"><a class="heading-link" href="#installation-by-saving-the-file"></a></p>

If you prefer not to use `npm`, you can download the latest version of the code here: [https://unpkg.com/@procore/bim-webviewer-sdk](https://unpkg.com/@procore/bim-webviewer-sdk)

If you would like a specific version you can declare that version in the url like so: [https://unpkg.com/@procore/bim-webviewer-sdk@4.0.0](https://unpkg.com/@procore/bim-webviewer-sdk@4.0.0)

### Load the Module with a Bundler (recommended)

<p class="heading-link-container"><a class="heading-link" href="#load-the-module-with-a-bundler-recommended"></a></p>

If you're using a bundling system with `import` (recommended):

```js
import * as ProcoreBim from '@procore/bim-webviewer-sdk';
```

### Load the Module Manually

<p class="heading-link-container"><a class="heading-link" href="#load-the-module-manually"></a></p>

If you're managing script loading manually:

```html
<!-- This will instantiate window.ProcoreBim -->
<script src="path/to/Procore.Bim.Webviewer.js"></script>
```

### Instantiate and Start the Viewer

<p class="heading-link-container"><a class="heading-link" href="#instantiate-and-start-the-viewer"></a></p>

```js
const viewer = new ProcoreBim.Webviewer(options);
viewer.start();
```

See the [Options](#options) section for more detail on the options object.

## Background Color

<p class="heading-link-container"><a class="heading-link" href="#background-color"></a></p>

The viewer does not render a background or color.
You may set your own background color with CSS on any parent element that contains the viewer for that background color to be displayed.

## API Introduction

<p class="heading-link-container"><a class="heading-link" href="#api-introduction"></a></p>

When the Webviewer SDK is loaded and parsed on your page, a new global object is added to your window with the key ProcoreBim.
ProcoreBim contains a mix of both static and non static methods and are generally grouped into namespaces to indicate primary functionality.

### ProcoreBim Namespaces

<p class="heading-link-container"><a class="heading-link" href="#procorebim-namespaces"></a></p>

| Namespace | Description                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| Cache     | Model caching management [Cache Namespace](#cache-namespace)                                                   |
| Webviewer | Model viewer to be instanced and allows for data and camera access [Webviewer Namespace](#webviewer-namespace) |

### Webviewer Namespaces

<p class="heading-link-container"><a class="heading-link" href="#webviewer-namespaces"></a></p>

| Namespace | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| api       | Helper method to retrieve data from procore server [Api Namespace](#api-namespace)            |
| camera    | Webviewer camera retrieval and manipulation [Camera Namespace](#camera-namespace)             |
| dom       | Helper methods to create extendable panels [Dom Namespace](#dom-namespace)                    |
| events    | Event management system similar to Javascript Event API [Events Namespace](#events-namespace) |
| model     | Webviewer model data retrieval and manipulation [Model Namespace](#model-namespace)           |
| gui       | Webviewer GUI manipulation [GUI Namespace](#gui-namespace)                                    |
| none      | Methods not grouped into a namespace                                                          |

When you create a new instance of Webviewer, an object is returned that allows you to act on the model and camera data.
Acting on these methods is done through dot notation.
Some methods belong to a sub namespace, and some methods do not.

```js
const viewer = new ProcoreBim.Webviewer(options);
viewer.start();
```

The Webviewer has been instanced and we have invoked the `start` method which does not belong to a namespace to start initializing the model viewer.

```js
viewer.camera.setPosition(1, 10, -1);
```

Here we invoke `setPosition` method from the camera namespace to set the camera position in the model viewer.

The `Cache` namespace contains static methods and has the following pattern:

```js
ProcoreBim.Cache.{method_name}
```

#### Complete Example

```js
const viewer = new ProcoreBim.Webviewer(options);

// Starts the viewer, must be called.
// `start` does not belong to a namespace.
viewer.start();

// Gets the camera direction, `getCameraDirection()` belongs to
// the `camera` namespace.
var cameraDirection = viewer.camera.getCameraDirection();

// Checks if the model is cached, `hasModel` returns a promise
// and belongs to the `Cache` namespace.
ProcoreBim.Cache.hasModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell'
}).then(function (isCached) {
  console.log(isCached);
});
```

## General API

<p class="heading-link-container"><a class="heading-link" href="#general-api"></a></p>

### Starting the Webviewer

<p class="heading-link-container"><a class="heading-link" href="#starting-the-webviewer"></a></p>

```js
start();
```

#### Description

Entry point to the Webviewer and starts rendering.
This method must be called.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

None

---

Terminating the Webviewer

```js
terminate();
```

#### Description

Stops rendering, frees memory, and removes webviewer from parent element.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

None

## Api Namespace

<p class="heading-link-container"><a class="heading-link" href="#api-namespace"></a></p>

### Get Object Name

<p class="heading-link-container"><a class="heading-link" href="#get-object-name"></a></p>

```js
getNamesForObjects(objectIds);
```

#### Description

Return an array of object names with the given id.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids |

##### Returns

```js
{
  id: number,
  value: string
}
```

##### Namespace

Api

## Camera Namespace

<p class="heading-link-container"><a class="heading-link" href="#camera-namespace"></a></p>

### Get Camera Position

<p class="heading-link-container"><a class="heading-link" href="#get-camera-position"></a></p>

```js
getPosition();
```

#### Description

Retrieves the active camera position.

#### Parameters

None

##### Returns

```js
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Set Camera Position

<p class="heading-link-container"><a class="heading-link" href="#set-camera-position"></a></p>

```js
setPosition(x, y, z);
```

#### Description

Sets the camera position.

#### Parameters

| Field Name | Required | Type   | Description                             |
| ---------- | -------- | ------ | --------------------------------------- |
| x          | true     | Number | X component of the world space position |
| y          | true     | Number | Y component of the world space position |
| z          | true     | Number | Z component of the world space position |

#### Returns

```js
{
  direction: {x: Number, y: Number, z: Number},
  position: {x: Number, y: Number, z: Number}
}
```

##### Namespace

Camera

---

### Get Camera Direction

<p class="heading-link-container"><a class="heading-link" href="#get-camera-direction"></a></p>

```js
getCameraDirection();
```

#### Description

Retrieves the direction vector for the active camera target.

#### Parameters

None

##### Returns

```js
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Get Camera Look At

<p class="heading-link-container"><a class="heading-link" href="#get-camera-look-at"></a></p>

```js
getLookAt();
```

#### Description

Gets the camera target.

#### Parameters

None

#### Returns

```js
{
  direction: {x: Number, y: Number, z: Number},
  position: {x: Number, y: Number, z: Number}
}
```

### Set Camera Look At

<p class="heading-link-container"><a class="heading-link" href="#set-camera-look-at"></a></p>

```js
setLookAt(x, y, z);
```

#### Description

Sets the camera target.

#### Parameters

| Field Name | Required | Type   | Description                             |
| ---------- | -------- | ------ | --------------------------------------- |
| x          | true     | Number | X component of the world space position |
| y          | true     | Number | Y component of the world space position |
| z          | true     | Number | Z component of the world space position |

#### Returns

```js
{
  direction: {x: Number, y: Number, z: Number},
  position: {x: Number, y: Number, z: Number}
}
```

##### Namespace

Camera

---

### Get Screen Position

<p class="heading-link-container"><a class="heading-link" href="#get-screen-position"></a></p>

```js
getScreenPosition(x, y, z);
```

#### Description

Take position in world space and convert it to screen space

#### Parameters

| Field Name | Required | Type   | Description                             |
| ---------- | -------- | ------ | --------------------------------------- |
| x          | true     | Number | X component of the world space position |
| y          | true     | Number | Y component of the world space position |
| z          | true     | Number | Z component of the world space position |

##### Returns

```js
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Get Snapshot

<p class="heading-link-container"><a class="heading-link" href="#get-snapshot"></a></p>

```js
getSnapshot(color);
```

#### Description

Force download the current render view into a png.

#### Parameters

| Field Name | Required | Type   | Description                                                                  |
| ---------- | -------- | ------ | ---------------------------------------------------------------------------- |
| color      | false    | String | Background css color, can use hex value ('#00ff00'), or color labels ('red') |

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Get Snapshot Data URL

<p class="heading-link-container"><a class="heading-link" href="#get-snapshot-data-url"></a></p>

```js
getSnapshotDataUrl(params);
```

#### Description

Returns a data url of an image produced by the current render view.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| params | false | Object | A JavaScript object that can have the following keys: 'color': Background css color, can use hex value ('#00ff00'), or color labels ('red') |

##### Returns

The canvas as a base64-encoded image.

##### Namespace

Camera

---

### Set Camera From BCF Camera

<p class="heading-link-container"><a class="heading-link" href="#set-camera-from-bcf-camera"></a></p>

```js
setBcfCamera(bcfCamera, applyOffset);
```

#### Description

Sets the camera position and direction from BCF camera data.
See [Orthogonal Camera](#orthogonal-camera-object) or [Perspective Camera](#perspective-camera-object)

NOTE: You should always pass `true` for the `applyOffset` argument. If you pass nothing or `false` then it is probably not what you want. It will soon be removed and that will be the default as it is an implementation detail that need not be exposed. See [migration guide for v7 to v8](#v7-to-v8) for more details.

#### Parameters

| Field Name   | Required | Type    | Description                                 |
| ------------ | -------- | ------- | ------------------------------------------- |
| bcfCamera    | true     | Object  | A BCF formatted object                      |
| applyOffset  | false    | boolean | Whether to apply global offset to bcfCamera |

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Get BCF Camera From Camera

<p class="heading-link-container"><a class="heading-link" href="#get-bcf-camera-from-camera"></a></p>

```js
getBcfCamera();
```

#### Description

Retrieves a BCF perspective camera.

#### Parameters

None

##### Returns

See [Perspective Camera](#perspective-camera-object)

##### Namespace

Camera

---

### Navigation to the home viewpoint

<p class="heading-link-container"><a class="heading-link" href="#navigation-to-the-home-viewpoint"></a></p>

```js
navToHomeView();
```

#### Description

Navigation to the home viewpoint if `bcfCamera` option has been set. If not, zooms to fit the axis-aligned bounding box of the entire model with space junk eliminated (see [`zoomToGlobal`](#zoom-to-global)).

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Zoom to Objects

<p class="heading-link-container"><a class="heading-link" href="zoom-to-objects"></a></p>

```js
zoomToObjects(objectIds);
```

#### Description

Moves camera from current position to fit the axis-aligned bounding box of the node or set of objects.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | ObjectId[] | An array of object ids. To zoom to a single object, pass an array of one. |

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Zoom to Fit a Bounding Box

<p class="heading-link-container"><a class="heading-link" href="zoom-to-fit-a-bounding-box"></a></p>

```js
zoomToBoundingBox(bbox);
```

#### Description

Moves camera to fit the specified axis-aligned bounding box.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| bbox | true | BoundingBox | `{ min: { x: Number, y: Number, z: Number }, max: { x: Number, y: Number, z: Number } }` |

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Zoom to Selection

<p class="heading-link-container"><a class="heading-link" href="zoom-to-selection"></a></p>

```js
zoomToSelection();
```

#### Description

Moves camera from current position to fit the axis-aligned bounding box of the current selection.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Zoom to Global

<p class="heading-link-container"><a class="heading-link" href="zoom-to-global"></a></p>

```js
zoomToGlobal();
```

#### Description

Moves camera to fit the axis-aligned bounding box of the entire model. Does not take into account current camera position, i.e. will always give you the same view regardless of where the camera is currently.

As of v5.1.0, `zoomToGlobal` will zoom to the "refined global bounding box" in which "space junk" has been eliminated. Space junk is loosely defined as objects which are far from all other objects in the model and distort the global bounding box dramatically.

Performance Note: the execution time for eliminating space junk scales with the number of meshnodes in the model. Mostly this cost is incurred at load time, but will be incurred the first time `zoomToGlobal` is called if a `bcfCamera` option was provided.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Camera

---

### Set Euler Angles

<p class="heading-link-container"><a class="heading-link" href="#set-euler-angles"></a></p>

```js
setEulerAngles(x, y, z);
```

#### Description

Sets the camera with euler angles, yaw, pitch and roll

#### Parameters

| Field Name | Required | Type   | Description                    |
| ---------- | -------- | ------ | ------------------------------ |
| x          | true     | Number | Angle of the x axis in radians |
| y          | true     | Number | Angle of the y axis in radians |
| z          | true     | Number | Angle of the z axis in radians |

##### Returns

```js
undefined
```

##### Namespace

Camera

## DOM Namespace

<p class="heading-link-container"><a class="heading-link" href="#dom-namespace"></a></p>

### Add Panel

<p class="heading-link-container"><a class="heading-link" href="#add-panel"></a></p>

```js
addPanel(domElement);
```

#### Description

Adds a container div to the Webviewer canvas and appends `Element` to it.

#### Parameters

| Field Name | Required | Type        | Description                                                           |
| ---------- | -------- | ----------- | --------------------------------------------------------------------- |
| domElement | true     | HTMLElement | The DOM element that makes up the panel to be appended to the viewer. |

##### Returns

```js
boolean
```

##### Namespace

Dom

---

### Remove Panel

<p class="heading-link-container"><a class="heading-link" href="#remove-panel"></a></p>

```js
removePanel(domElement);
```

#### Description

Removes the container div from the viewer which contains the argument `Element`.

#### Parameters

| Field Name | Required | Type        | Description                                                            |
| ---------- | -------- | ----------- | ---------------------------------------------------------------------- |
| domElement | true     | HTMLElement | The DOM element that makes up the panel to be removed from the viewer. |

##### Returns

```js
boolean
```

##### Namespace

Dom

## Events Namespace

<p class="heading-link-container"><a class="heading-link" href="#events-namespace"></a></p>

### Add Event

<p class="heading-link-container"><a class="heading-link" href="#add-event"></a></p>

```js
addEventListener(eventName, callback);
```

#### Description

Executes a callback when an internal viewer event occurs.

The `callback` parameter is a third party defined function to be executed when the event fires. Depending on the event, the callback function may return undefined, or data. This data may be a number, string, or a JavaScript object.

#### Parameters

| Field Name | Required | Type     | Description                         |
| ---------- | -------- | -------- | ----------------------------------- |
| eventName  | true     | String   | Name of the event                   |
| callback   | true     | Function | Function to evoke when event occurs |

##### Returns

```js
undefined
```

##### Namespace

Events

---

### Remove Event

<p class="heading-link-container"><a class="heading-link" href="#remove-event"></a></p>

```js
removeEventListener(eventName, callback);
```

#### Description

Removes a callback from an internal viewer event, if it is identical to a callback that was already added.

#### Parameters

| Field Name | Required | Type     | Description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| eventName  | true     | String   | Name of the event                                   |
| callback   | true     | Function | The function that was added from `addEventListener` |

##### Returns

```js
undefined
```

##### Namespace

Events

---

### Dispatch Event

<p class="heading-link-container"><a class="heading-link" href="#dispatch-event"></a></p>

```js
dispatchEvent(eventName, callback);
```

#### Description

Manually dispatches an event

#### Parameters

| Field Name | Required | Type     | Description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| eventName  | true     | String   | Name of the event                                   |
| callback   | true     | Function | The function that was added from `addEventListener` |

##### Returns

```js
undefined
```

##### Namespace

Events

---

## Event Names

<p class="heading-link-container"><a class="heading-link" href="#event-names"></a></p>

The following event names are available to notify third party code of changes in the viewer.

#### Complete Example

```js
const viewer = new ProcoreBim.Webviewer(options);

viewer.events.addEventListener('appResize', (data) => {
  // Called when the window resizes and returns an object with properties
  // `offsetHeight`, `offsetWidth`, `offsetLeft`, `offsetTop`.
  console.log(data.offsetHeight);
});

viewer.events.addEventListener('bcfCameraSet', () => {
  // Called when the camera has been set, does not return any data.
});

viewer.start();
```

### animate

<p class="heading-link-container"><a class="heading-link" href="#animate"></a></p>

Fires at the end of the animation loop. Returns an object containing the property `stage` to indicate the stage the renderer is in to render the scene. `renderIdle` indicates that the scene has been fully rendered and the renderer is no longer rendering any objects. `renderStart` indicates the start of rendering a scene. `renderProgress` is a state after `renderStart` and indicates the renderer is still rendering the scene. Finally, `renderComplete` indicates that all the objects have been rendered.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| stage | string | The stage the renderer is in during the animation loop. Can either be `renderIdle`, `renderStart`, `renderProgress`, or `renderComplete`. |

---

### appResize

<p class="heading-link-container"><a class="heading-link" href="#appresize"></a></p>

Fires when the document view (window) has been resized.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| offsetHeight | number | New offset height of the webviewer parent element. |
| offsetWidth  | number | New offset width of the webviewer parent element.  |
| offsetLeft   | number | New offset left of the webviewer parent element.   |
| offsetTop    | number | New offset top of the webviewer parent element.    |

---

### appStart

<p class="heading-link-container"><a class="heading-link" href="#appstart"></a></p>

Fires after `start()` is called on the Webviewer instance.

---

### bcfCameraSet

<p class="heading-link-container"><a class="heading-link" href="#bcfcameraset"></a></p>

Fires after a BCF Camera has been set.

---

### cameraUpdated

<p class="heading-link-container"><a class="heading-link" href="#cameraupdated"></a></p>

Fires after the camera direction or camera position has been modified.

---

### canvasReady

<p class="heading-link-container"><a class="heading-link" href="#canvasready"></a></p>

Fires after the rendering canvas has been created.

---

### coachmarkHyperlinkClicked

<p class="heading-link-container"><a class="heading-link" href="#coachmarkhyperlinkclicked"></a></p>

Fires when the coachmark indicator has been cleared. The coachmark will appear in the upper right hand corner of the webviewer appear when:
- objects are hidden
- section planes are applied
- a field of view has been applied other than the default field of view

When the coachmark is cleared, this event will fire with a value indicating which type of coachmark was cleared:
- `"hidden"`
- `"section"`
- `"fov"`

---

### doubleClick

<p class="heading-link-container"><a class="heading-link" href="#doubleclick"></a></p>

Fires after a double click occurs on the webviewer container element. Returns a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) object.

---

### downloadComplete

<p class="heading-link-container"><a class="heading-link" href="#downloadcomplete"></a></p>

Fires after all download requests for the model have been completed. This event will still fire even if the model is cached.

---

### downloadProgress

<p class="heading-link-container"><a class="heading-link" href="#downloadprogress"></a></p>

Fires periodically to report progress on how much of the model has been downloaded.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| loaded      | number  | Number of bytes downloaded.                                                                                     |
| total       | number  | Total size of model in bytes. This amount will be arbitrarily large until all the requests have been initiated. |
| total_found | boolean | Returns true to indicates all the requests for the model has been initiated.                                    |

---

### downloadStart

<p class="heading-link-container"><a class="heading-link" href="#downloadstart"></a></p>

Fires before requests are made to download the model.

---

### drawingNavigated

<p class="heading-link-container"><a class="heading-link" href="#drawingnavigated"></a></p>

Fires when the 2D Navigation overlay is used to navigate the model. Specifically, this fires after a location and direction have been chosen on the floor plan and the overlay is dismissed.

---

### drawingMiniClick

<p class="heading-link-container"><a class="heading-link" href="#drawingminiclick"></a></p>

Fires when the 2D Navigation mini map was clicked on.

---

### floorPlan

<p class="heading-link-container"><a class="heading-link" href="#floorplan"></a></p>

Fires when the 2D Navigation overlay is interacted with.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| floorPlanNavigateAndClose | function    | Provides a callback function to navigate the camera to a position and close the overlay. Returns a promise. |
| floorPlanPoint            | function    | Provides a callback function to calculate a point on the current floor plan. Returns a promise.             |
| overlay                   | HTMLElement | The HTMLElement for the 2D Navigation overlay                                                               |
| type                      | string      | The type of interaction and has the following values: `open`, `close`, and `update`                         |

#### floorPlanNavigateAndClose

<p class="heading-link-container"><a class="heading-link" href="#floorplannavigateandclose"></a></p>

Updates the camera position and direction in addition to dismissing the 2D floor plan overlay.

##### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| x          | true     | number | x coordinate in 3D space.  |
| y          | true     | number | y coordinate in 3D space.  |
| z          | true     | number | z coordinate in 3D space.  |
| dx         | true     | number | x direction of the camera. |
| dy         | true     | number | y direction of the camera. |

#### floorPlanPoint

<p class="heading-link-container"><a class="heading-link" href="#floorplanpoint"></a></p>

Returns the corresponding point on the 2D floor plan overlay from a point in 3D model space.

##### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| x          | true     | number | x coordinate of the camera. |
| y          | true     | number | y coordinate of the camera. |
| z          | true     | number | z coordinate of the camera. |
| dx         | true     | number | x direction of the camera.  |
| dy         | true     | number | y direction of the camera.  |

#### Example

```js
const viewer = new ProcoreBim.Webviewer(options);

let floorPlanNavigateAndClose = null;

viewer.events.addEventListener('floorPlan', (data) => {
  // Executed when the 2D floor plan overlay is interacted with.
  if (data.type === 'open') {
    // Your application might need to know when the 2D floor plan overlay is `open` and keep a reference to
    // floorPlanNavigateAndClose
    floorPlanNavigateAndClose = data.floorPlanNavigateAndClose;
  }
});
viewer.start();

// Perhaps your application places markers that represent 3D positions on the 2D floor plan overlay while it is open. When
// tapping on a marker, this function could be called that uses `floorPlanNavigateAndClose` to set the camera and close the
// 2D floor plan overlay.
const goto = (camera) => {
  if (floorPlanNavigateAndClose !== null) {
    floorPlanNavigateAndClose(camera.x, camera.y, camera.z, 0.1, 0.1);
    floorPlanNavigateAndClose = null;
  }
};
```

---

### fieldOfViewChanged

<p class="heading-link-container"><a class="heading-link" href="#fieldofviewchanged"></a></p>

Fires when the camera field of view has been changed. Returns a number in degrees.

---

### hideUpdated

<p class="heading-link-container"><a class="heading-link" href="#hideupdated"></a></p>

Fires when the object hidden set has been updated.

---

### hideSimilarCompleted

<p class="heading-link-container"><a class="heading-link" href="#hidesimilarcompleted"></a></p>

Fires when the `Hide Similar` from the right click context menu operation has completed.

---

### intersectPointClick

<p class="heading-link-container"><a class="heading-link" href="#intersectpointclick"></a></p>

Fires when a mouse click occurs on any part of the model and returns that point of intersection.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| x          | number | x coordinate of the point of intersection. |
| y          | number | y coordinate of the point of intersection. |
| z          | number | z coordinate of the point of intersection. |

---

### isolateCompleted

<p class="heading-link-container"><a class="heading-link" href="#isolatecompleted"></a></p>

Fires when the `Isolate` from the right click context menu operation has completed.

---

### messages

<p class="heading-link-container"><a class="heading-link" href="#messages"></a></p>

Fires when the webviewer throws a warning or error.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| messageType | string | The type of message, either `Warning` or `Error`. |
| component   | string | Where the message originates from.                |
| message     | string | A human readable message.                         |

---

### measured

<p class="heading-link-container"><a class="heading-link" href="#measured"></a></p>

Fires when measuring two objects has completed.

---

### modelTreeParentInteracted

<p class="heading-link-container"><a class="heading-link" href="#modeltreeparentinteracted"></a></p>

Fires when an object in the `Model Objects` has been interacted with.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| children | number | The number of children the interacted object has. |
| action | string | The type of action, can be the following: `checkbox`, `open`, `click`, `double_click` or `close` |
| depth | number | The depth of the object interacted with. A depth of 0 indicates top level objects. A depth of 1 indicates an object that is one level down from root level objects and so on. |

---

### markupDisplayed

<p class="heading-link-container"><a class="heading-link" href="#markupdisplayed"></a></p>

Fires when markup from a viewpoint has been displayed.

---

### markupDismissed

<p class="heading-link-container"><a class="heading-link" href="#markupdismissed"></a></p>

Fires when markup from a viewpoint has been dismissed.

---

### navigationChanged

<p class="heading-link-container"><a class="heading-link" href="#navigationchanged"></a></p>

Fires when the navigation mode has changed.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| mode       | number | The type of navigation that was just activated. |
| controls   | object | An instance of the controller object.           |

---

### objectDoubleClick

<p class="heading-link-container"><a class="heading-link" href="#objectdoubleclick"></a></p>

Fires on double mouse clicks. If the double mouse click occurs on an object, this event returns a Meshnode Index, otherwise -1 is returned. A double click also produces one `objectSingleClick` event.

---

### objectSingleClick

<p class="heading-link-container"><a class="heading-link" href="#objectsingleclick"></a></p>

Fires on a single mouse click.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| objectId | number | The object id of the selected object. -1 if empty space is clicked. |
| selectionContainerId | number | The object id of the selection container. Currently this is always the "First Object". -1 if empty space is clicked |
| ancestry | object[] | An array of objects from the root object down to the selected object. Each object also contains fully materialized children one level deep. Past this level the children are object ids. Empty array if empty space is clicked. |


---

### objectHide

<p class="heading-link-container"><a class="heading-link" href="#objecthide"></a></p>

Fires when objects have been hidden.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| origin     | string | The origin of the hide operation, can be: `context_menu`, `keyboard`, `object_tree`, `object_tree_context_menu_hide`, or `object_tree_actions_hide` |

---

### objectUnhide

<p class="heading-link-container"><a class="heading-link" href="#objectunhide"></a></p>

Fires when objects have been removed from the hidden set.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| origin     | string | The origin of the un hide operation, can be: `coachmark_hidden`, `object_tree`, `object_tree_all_objects` |

---

### objectSelect

<p class="heading-link-container"><a class="heading-link" href="#objectselect"></a></p>

Fires when an object has been selected. Does not fire if empty space is clicked because nothing has been selected.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| objectId | number | The object id of the selected object |
| selectionContainerId | number | The object id of the selection container. Currently this is always the "First Object". |
| ancestry | object[] | An array of objects from the root object down to the selected object. Each object also contains fully materialized children one level deep. Past this level the children are object ids |

---

### objectDeselect

<p class="heading-link-container"><a class="heading-link" href="#objectdeselect"></a></p>

Fires when an object has been deselected. This event returns an array of object ids that were deselected.

---

### optionsChanged

<p class="heading-link-container"><a class="heading-link" href="#optionschanged"></a></p>

Fires when the Webviewer options have changed. This event fires when `setOptions` is called, or when actions cause the multiple selection option to change, such as keyboard shortcuts to multi select objects.

---

### objectMeasure

<p class="heading-link-container"><a class="heading-link" href="#objectmeasure"></a></p>

Fires when objects are selected for measurement. This event returns a Meshnode Index of the object selected for measurement.

---

### renderReady

<p class="heading-link-container"><a class="heading-link" href="#renderready"></a></p>

Fires when the webviewer is ready to render the model.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| offsetHeight | number | Offset height of the parent element container. |
| offsetLeft   | object | Offset left of the parent element container.   |
| offsetTop    | number | Offset top of the parent element container.    |
| offsetWidth  | object | Offset width of the parent element container.  |

---

### redo

<p class="heading-link-container"><a class="heading-link" href="#redo"></a></p>

Fires when the keyboard shortcut to redo is pressed. This event fires regardless if there is anything to redo.

---

### selectTool

<p class="heading-link-container"><a class="heading-link" href="#selecttool"></a></p>

Fires when a tool has been activated.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| origin     | string | The origin of the tool being activated.                                                     |
| tool       | number | The tool that has been activated, enumerated from `ProcoreBim.Webviewer.toolbar_enum`. |

---

### selectedUpdated

<p class="heading-link-container"><a class="heading-link" href="#selectedupdated"></a></p>

Fires when the selection set of objects has been updated. This event returns an array of the full set of selected object ids at the time of selection update.

---

### singleClick

<p class="heading-link-container"><a class="heading-link" href="#singleclick"></a></p>

Fires when a single click occurs in the webviewer container element. This event returns a `MouseEvent` object.

---

### sectionBoxSet

<p class="heading-link-container"><a class="heading-link" href="#sectionboxset"></a></p>

Fires when a section box has been applied.

---

### sectionPlaneAdded

<p class="heading-link-container"><a class="heading-link" href="#sectionplaneadded"></a></p>

Fires when section planes have been applied.

---

### sectionPlaneRemoved

<p class="heading-link-container"><a class="heading-link" href="#sectionplaneremoved"></a></p>

Fires when a section plane has been removed.

---

### sectionsCleared

<p class="heading-link-container"><a class="heading-link" href="#sectionscleared"></a></p>

Fires when all section planes have been removed as a result of individually removing all the planes, calling `clearSection`, or calling `removeSectionBox`.

---

### savedViewpointClicked

<p class="heading-link-container"><a class="heading-link" href="#savedviewpointclicked"></a></p>

Fires when a Saved Viewpoint from the Viewpoints tool has been clicked on.

---

### undo

<p class="heading-link-container"><a class="heading-link" href="#undo"></a></p>

Fires when the keyboard shortcut to undo is pressed. This event fires regardless if there is anything to undo.

---

### windowComponentChanged

<p class="heading-link-container"><a class="heading-link" href="#windowcomponentchanged"></a></p>

Fires when a window based tool has changed its position or size.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| modalSize  | object | An object with the keys, `height`, `left`, `top`, `width` to indicate the current position and size of the window. |
| name       | string | Human readable name of the window based tool that is changing.                                                     |

---

### windowOpen

<p class="heading-link-container"><a class="heading-link" href="#windowopen"></a></p>

Fires when a window based tool has been opened.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| elementId | string | The value of the id attribute on the root DOM element of the window. |
| toolId | number | The id of the tool the window belongs to. See [Tools](#tools) for further information. |


---

### windowClose

<p class="heading-link-container"><a class="heading-link" href="#windowclose"></a></p>

Fires when a window based tool has been hidden.

#### Data Properties

| Field Name | Type | Description |
| - | - | - |
| elementId | string | The value of the id attribute on the root DOM element of the window. |
| toolId | number | The id of the tool the window belongs to. See [Tools](#tools) for further information. |

## Model Namespace

<p class="heading-link-container"><a class="heading-link" href="#model-namespace"></a></p>

### Get Meshnode from Meshnode Index

<p class="heading-link-container"><a class="heading-link" href="#get-meshnode-from-meshnode-index"></a></p>

```js
getMeshnode(meshnodeIndex);
```

#### Description

Retrieves a JavaScript object that describes the object.

#### Parameters

| Field Name | Required | Type | Description      |
| - | - | - | - |
| meshnodeIndex | true | Number | meshnode index |

##### Returns

See [Meshnode](#meshnode).

##### Namespace

Model

---

## Get Meshnode from Object ID

<p class="heading-link-container"><a class="heading-link" href="#get-object-from-object-id"></a></p>

```js
getMeshnodeFromObjectId(objectId);
```

#### Description

Retrieves the Meshnode associated with an `objectId` or `null` if there is none.

`objectId`'s are returned by these Rest endpoints:

- BIM Property File Objects: https://developers.procore.com/reference/rest/v1/bim-model-objects?version=1.0
- BIM Model Objects: https://developers.procore.com/reference/rest/v1/bim-model-objects?version=1.0

#### Parameters

| Field Name | Required | Type | Description      |
| - | - | - | - |
| objectId | true | Number | Object ID |

##### Returns

See [Meshnode](#meshnode).

##### Namespace

Model

---

### Get Hidden Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#get-hidden-meshnode-indices"></a></p>

```js
getHiddenMeshnodeIndices();
```

#### Description

Retrieves a list of meshnode indices that are currently hidden.

#### Parameters

None

##### Returns

```js
Array[Number]
```

##### Namespace

Model

---

### Add Hidden Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#add-hidden-meshnode-indices"></a></p>

```js
addHiddenMeshnodeIndices(meshnodeIndices);
```

#### Description

Hides meshnode indices. Does not clear previous hiding(s).

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| meshnodeIndices | true | Array[Number] | Array of meshnode indices |

##### Returns

```js
Set(Number)
```

##### Namespace

Model

---

### Has Hidden Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#has-hidden-meshnode-indices"></a></p>

```js
hasHiddenMeshnodeIndices(meshnodeIndices);
```

#### Description

Checks if passed meshnode indices are hidden.
Returns `true` is all the meshnode indices in the array are hidden.
Otherwise `false` is returned if at least one meshnode is not hidden.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| meshnodeIndices | true | Array[Number] | Array of meshnode indices |

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Clear Hidden Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#clear-hidden-meshnode-indices"></a></p>

```js
clearHiddenMeshnodeIndices();
```

#### Description

Clear hidden meshnode indices.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Get Selected Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#get-selected-meshnode-indices"></a></p>

```js
getSelectedMeshnodeIndices();
```

#### Description

Retrieves a list of meshnode indices that are currently selected.

#### Parameters

None

##### Returns

```js
Array[Number]
```

##### Namespace

Model

---

### Add Selected Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#add-selected-meshnode-indices"></a></p>

```js
addSelectedMeshnodeIndices(meshnodeIndices);
```

#### Description

Selects meshnode indices. Does not clear previous selection(s).

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| meshnodeIndices | true | Array[Number] | Array of meshnode indices |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Has Selected Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#has-selected-meshnode-indices"></a></p>

```js
hasSelectedMeshnodeIndices(meshnodeIndices);
```

#### Description

Checks if passed meshnode indices are selected.
Returns `true` is all the meshnode indices in the array are selected.
Otherwise `false` is returned if at least one meshnode index is not selected.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| meshnodeIndices | true | Array[Number] | Array of meshnode indices |

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Clear Selected Meshnode Indices

<p class="heading-link-container"><a class="heading-link" href="#clear-selected-meshnode-indices"></a></p>

```js
clearSelectedMeshnodeIndices();
```

#### Description

Deselects all meshnodes.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Set Meshnode Color

<p class="heading-link-container"><a class="heading-link" href="#set-meshnode-color"></a></p>

```js
setMeshnodeColor(meshnodeIndex, hexColor, opacity);
```

#### Description

Overrides the color of a meshnode.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| meshnodeIndex | true | Number | Meshnode Index |
| hexColor | true | String | Hex Color |
| opacity | true | Number | Opacity |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Set Object Color

<p class="heading-link-container"><a class="heading-link" href="#set-object-color"></a></p>

```js
setObjectColor(colorDescriptor);
```

#### Description

Changes the color of an object while in three modes; `default`, `selected` or `xray`. Default is while the object is neither selected or in X Ray mode. Selected is while the object is selected. X Ray is while in X Ray mode.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| palettes | true | Object[] | see [colorDescriptor](#colordescriptor) |

##### ColorDescriptor

<p class="heading-link-container"><a class="heading-link" href="#colordescriptor"></a></p>

A ColorDescriptor is composed of a palette, which may contain at least one of default, xray, or selected, and an array of object ids to apply it to.

```js
{
  palette: {
    default: {color: '#ff0000', opacity: 1},
    xray: {color: '#00ff00', opacity: 1},
    selected: {color: '#0000ff', opacity: 1}
  },
  objectIds: [1, 2, 3]
}
```

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Clear Object Color

<p class="heading-link-container"><a class="heading-link" href="#clear-object-color"></a></p>

```js
clearObjectColor(objectIds);
```

#### Description

Clears object colors set by [setObjectColor](#set-object-color) defined by sets of object ids.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | Array of object ids |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Clear All Object Color

<p class="heading-link-container"><a class="heading-link" href="#clear-all-object-color"></a></p>

```js
clearAllObjectColor();
```

#### Description

Clears all object colors set by [setObjectColor](#set-object-color).

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Get Sections

<p class="heading-link-container"><a class="heading-link" href="#get-sections"></a></p>

```js
getSections(format);
```

#### Description

Returns the current sectioning information as set by the Section Box tool or the sectioning API methods (e.g. [`setSectionBox`](#set-section-box) and [`addSectionPlane`](#add-section-plane)).


#### Parameters

| Field Name | Required | Type   | Description         |
| ---------- | -------- | ------ | --------------------|
| format     | true     | string | 'autodesk' \| 'bcf' |

##### Returns

The `format` parameter determines the shape of this data.

The `bcf` format will return an array of [BCF clipping plane](#bcf-clipping-plane) regardless of whether a box or plane section is set. If no section is set it will return `[]`.

The `autodesk` format will return an [Autodesk Section Data object](#autodesk-section-data). If no section is set it will return `null`.

##### Namespace

Model

---

### Set Section Box

<p class="heading-link-container"><a class="heading-link" href="#set-section-box"></a></p>

```js
setSectionBox(minXYZ, maxXYZ, rotation);
```

#### Description

Sets section box given an XYZ max and min and rotation(optional);

#### Parameters

| Field Name | Required | Type   | Description                         |
| ---------- | -------- | ------ | ----------------------------------- |
| minXYZ     | true     | Object | { x: Number, y: Number, z: Number } |
| maxXYZ     | true     | Object | { x: Number, y: Number, z: Number } |
| rotation   | false    | Object | { x: Number, y: Number, z: Number } |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Remove Section Box

<p class="heading-link-container"><a class="heading-link" href="#remove-section-box"></a></p>

```js
removeSectionBox();
```

#### Description

Removes section box.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Add Section Plane

<p class="heading-link-container"><a class="heading-link" href="#add-section-plane"></a></p>

```js
addSectionPlane(distance, normal);
```

#### Description

Adds a single section plane.

#### Parameters

| Field Name | Required | Type   | Description                                      |
| ---------- | -------- | ------ | ------------------------------------------------ |
| distance   | true     | Number | The signed distance from the origin to the plane |
| normal     | true     | Object | { x: Number, y: Number, z: Number }              |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Remove Section Plane

<p class="heading-link-container"><a class="heading-link" href="#remove-section-plane"></a></p>

```js
removeSectionPlane(uuid);
```

#### Description

Removes a single section plane.

#### Parameters

| Field Name | Required | Type   | Description                                |
| ---------- | -------- | ------ | ------------------------------------------ |
| uuid       | true     | string | Remove a specific section plane with uuid. |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Clear Sections

<p class="heading-link-container"><a class="heading-link" href="#clear-sections"></a></p>

```js
clearSection();
```

#### Description

Removes all sections, planes and boxes.

#### Parameters

None

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Set Webviewer Configuration options

<p class="heading-link-container"><a class="heading-link" href="#set-webviewer-configuration-options"></a></p>

```js
setOptions(options);
```

#### Description

Sets Webviewer configuration options.
See [Options](#options).
Currently can only set `selection`.

#### Parameters

| Field Name | Required | Type   | Description                                                    |
| ---------- | -------- | ------ | -------------------------------------------------------------- |
| options    | true     | Object | The options to set, currently only supports setting selection. |

##### Returns

```js
undefined
```

##### Namespace

Model

---

### Get relative planmap space position based on model space position

<p class="heading-link-container"><a class="heading-link" href="#get-relative-planmap-space-position-based-on-model-space-position"></a></p>

```js
MapToModelSpace(
  point,
  modelA,
  modelB,
  planA,
  planB,
  imgSize,
  rect,
  direction,
  applyOffset
);
```

#### Description

Retrieve the model space point {x, y} relative to the planmap space point Note: applyOffset affected only when event renderReady has been fired.

#### Parameters

| Field Name  | Required | Type    | Description                                                           |
| ----------- | -------- | ------- | --------------------------------------------------------------------- |
| point       | true     | Object  | current model point:{ x: Number, y: Number}                           |
| modelA      | true     | Object  | model start point:{ x: Number, y: Number}                             |
| modelB      | true     | Object  | model end point:{ x: Number, y: Number}                               |
| planA       | true     | Object  | sheet start point:{ x: Number, y: Number}                             |
| planB       | true     | Object  | sheet end point:{ x: Number, y: Number}                               |
| imgSize     | true     | Object  | original image size:{ x: Number, y: Number}                           |
| rect        | true     | Object  | resized image size, can be equal to imageSize:{ x: Number, y: Number} |
| direction   | true     | Object  | current direction on map point to:{ x: Number, y: Number}             |
| applyOffset | false    | Boolean | apply global offset for calculations.                                 |

##### Returns

```js
{
  x: Number,
  y: Number,
  dir_x: Number,
  dir_y: Number
};
```

##### Namespace

Model

---

### Get relative model space position based on planmap space position

<p class="heading-link-container"><a class="heading-link" href="#get-relative-model-space-position-based-on-planmap-space-position"></a></p>

```js
ModelToMapSpace(
  point,
  modelA,
  modelB,
  planA,
  planB,
  imgSize,
  rect,
  direction,
  applyOffset
);
```

#### Description

Retrieve the planmap space point {x, y} relative to the model space point Note: applyOffset affected only when event renderReady has been fired.

#### Parameters

| Field Name  | Required | Type    | Description                                                           |
| ----------- | -------- | ------- | --------------------------------------------------------------------- |
| point       | true     | Object  | current model point:{ x: Number, y: Number}                           |
| modelA      | true     | Object  | model start point:{ x: Number, y: Number}                             |
| modelB      | true     | Object  | model end point:{ x: Number, y: Number}                               |
| planA       | true     | Object  | sheet start point:{ x: Number, y: Number}                             |
| planB       | true     | Object  | sheet end point:{ x: Number, y: Number}                               |
| imgSize     | true     | Object  | original image size:{ x: Number, y: Number}                           |
| rect        | true     | Object  | resized image size, can be equal to imageSize:{ x: Number, y: Number} |
| direction   | true     | Object  | current direction on map point to:{ x: Number, y: Number}             |
| applyOffset | false    | Boolean | apply global offset for calculations.                                 |

##### Returns

```js
{
  x: Number,
  y: Number,
  dir_x: Number,
  dir_y: Number
};
```

##### Namespace

Model

---

### Get Global Offset

<p class="heading-link-container"><a class="heading-link" href="#get-global-offset"></a></p>

```js
getGlobalOffset();
```

#### Description

Retrieves the global offset, if there is one.

#### Parameters

None

##### Returns

```js
{offsetX: Number, offsetY: Number, offsetZ: Number}
```

##### Namespace

Model

---

### Get Number Of Objects Selected

<p class="heading-link-container"><a class="heading-link" href="#get-number-of-objects-selected"></a></p>

```js
getNumObjectsSelected(method);
```

#### Description

Retrieve the number of objects selected base on the count method. 

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| method | false | string |  Method to count, can be the following: `FirstObject`, `Object`, or `Geometry`. Default value is `FirstObject` |

##### Returns

```js
{
  count: number
}
```

##### Namespace

Model

---

### Get Object

<p class="heading-link-container"><a class="heading-link" href="#get-object"></a></p>

```js
getObject(id);
```

#### Description

Returns a model object with the given id. Contains data such as bounding box, hidden/selected states, and parent/child relationships.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| id | true | number | The id of the object |

##### Returns

```js
{
  id: number, 
  bbox: {
    min: number[],
    max: number[]
  }, 
  nodeType: number,
  hidden: boolean,
  selected: boolean,
  partiallySelected: boolean,
  parentId: number,
  children: number[]
}
```

##### Namespace

Model

---


### Get Objects

<p class="heading-link-container"><a class="heading-link" href="#get-objects"></a></p>

```js
getObjects(objectIds);
```

#### Description

Returns an array of model objects as defined by each id in the array. Contains data such as bounding box, hidden/selected states, and parent/child relationships.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids. |

##### Returns

```js
[
  {
    id: number, 
    bbox: {
      min: number[],
      max: number[]
    }, 
    nodeType: number,
    hidden: boolean,
    selected: boolean,
    partiallySelected: boolean,
    parentId: number,
    children: number[]
  }
]
```

##### Namespace

Model

---

### Get Root Object

<p class="heading-link-container"><a class="heading-link" href="#get-root-object"></a></p>

```js
getRootObject();
```

#### Description

Returns a model object which is the root of the model object tree. Contains data such as bounding box, hidden/selected states, and parent/child relationships.

#### Parameters

None

##### Returns

```js
{
  id: number,
  bbox: {
    min: number[],
    max: number[]
  },
  nodeType: number,
  hidden: boolean,
  selected: boolean,
  partiallySelected: boolean,
  parentId: undefined,
  children: number[]
}
```

##### Namespace

Model

---

### Hide Objects

<p class="heading-link-container"><a class="heading-link" href="#hide-objects"></a></p>

```js
hideObjects(objectIds);
```

#### Description

Hides objects defined by the array of object ids.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids to hide. |

##### Returns

```js
boolean
```

##### Namespace

Model

---


### Hide All Objects

<p class="heading-link-container"><a class="heading-link" href="#hide-all-objects"></a></p>

```js
hideAllObjects();
```

#### Description

Hides all objects.

#### Parameters

None

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Unhide All Objects

<p class="heading-link-container"><a class="heading-link" href="#unhide-all-objects"></a></p>

```js
unhideAllObjects();
```

#### Description

Unhides all objects.

#### Parameters

None

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Unhide Objects

<p class="heading-link-container"><a class="heading-link" href="#unhide-objects"></a></p>

```js
unhideObjects(objectIds);
```

#### Description

Unhides objects defined by the array of object ids.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids to unhide. |

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Get Hidden Objects

<p class="heading-link-container"><a class="heading-link" href="#get-hidden-objects"></a></p>

```js
getHiddenObjects();
```

#### Description

Returns an array of object ids that are hidden.

#### Parameters

None

##### Returns

```js
number[]
```

##### Namespace

Model

---

### Select Objects

<p class="heading-link-container"><a class="heading-link" href="#select-objects"></a></p>

```js
selectObjects(objectIds);
```

#### Description

Selects objects defined by the array of object ids.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids to select. |

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Select All Objects

<p class="heading-link-container"><a class="heading-link" href="#select-all-objects"></a></p>

```js
selectAllObjects();
```

#### Description

Selects all objects.

#### Parameters

None

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Deselect All Objects

<p class="heading-link-container"><a class="heading-link" href="#deselect-all-objects"></a></p>

```js
deselectAllObjects();
```

#### Description

Deselects all objects.

#### Parameters

None

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Deselect Objects

<p class="heading-link-container"><a class="heading-link" href="#deselect-objects"></a></p>

```js
deselectObjects(objectIds);
```

#### Description

Deselect objects defined by the array of object ids.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| objectIds | true | number[] | An array of object ids to deselect. |

##### Returns

```js
boolean
```

##### Namespace

Model

---

### Get Selected Objects

<p class="heading-link-container"><a class="heading-link" href="#get-selected-objects"></a></p>

```js
getSelectedObjects();
```

#### Description

Returns an array of object ids that are selected.

#### Parameters

None

##### Returns

```js
number[]
```

##### Namespace

Model

---

### Set X Ray Mode

<p class="heading-link-container"><a class="heading-link" href="#set-x-ray-mode"></a></p>

```js
setXRayMode();
```

#### Description

Sets the rendering mode to X Ray. In this mode, all non selected geometry is rendered with a single color and are transparent.

#### Parameters

None

##### Returns

None

##### Namespace

Model

---

### Set Normal Mode

<p class="heading-link-container"><a class="heading-link" href="#set-normal-mode"></a></p>

```js
setNormalMode();
```

#### Description

Sets the rendering mode to normal. In this mode, geometry is rendered using the geometries color and opacity values.

#### Parameters

None

##### Returns

None

##### Namespace

Model

---

### Set Navigation Mode

<p class="heading-link-container"><a class="heading-link" href="#set-navigation-mode"></a></p>

```js
setNavigationMode(mode);
```

#### Description

Sets the navigation mode. The following values for `mode` are: 0 for the default mode, 1 for fly, and 2 for orbit. 


#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| mode | true | number | The following values for `mode` are: 0 for the default mode, 1 for fly, and 2 for orbit. |

##### Returns

None

##### Namespace

Model

---

### Set Measurement

<p class="heading-link-container"><a class="heading-link" href="#set-measurement"></a></p>

```js
setMeasurement(enable);
```

#### Description

Enables or disables the measurement tool. Requires the Measurement Tool be enabled upon viewer initialization by adding `MEASUREMENT_SD` to the options tools array. 

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| enable | true | boolean | True to enable the measurement tool. False to disable. |

##### Returns

None

##### Namespace

Model

## Cache Namespace

<p class="heading-link-container"><a class="heading-link" href="#cache-namespace"></a></p>

### Is the model cached

<p class="heading-link-container"><a class="heading-link" href="#is-the-model-cached"></a></p>

```js
hasModel(urlsObject);
```

#### Description

Checks if the internal caching system contains model data for an array of urls.

#### Parameters

| Field Name | Required | Type   | Description                     |
| ---------- | -------- | ------ | ------------------------------- |
| urlsObject | true     | Object | See [Urls Object](#urls-object) |

#### Example

```js
ProcoreBim.Cache.hasModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell'
}).then(function (isCached) {
  console.log(isCached);
});
```

##### Returns

```js
Promise(boolean)
```

---

### Remove Model

<p class="heading-link-container"><a class="heading-link" href="#remove-model"></a></p>

```js
removeModel(urlsObject);
```

#### Description

Remove model data for an array of urls.

#### Parameters

| Field Name | Required | Type   | Description                     |
| ---------- | -------- | ------ | ------------------------------- |
| urlsObject | true     | Object | See [Urls Object](#urls-object) |

#### Example

```js
ProcoreBim.Cache.removeModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell'
}).then(function (modelRemoved) {
  console.log(modelRemoved);
});
```

##### Returns

```js
Promise(boolean)
```

## GUI Namespace

<p class="heading-link-container"><a class="heading-link" href="#gui-namespace"></a></p>

### Add Context Menu Item

<p class="heading-link-container"><a class="heading-link" href="#add-context-menu-item"></a></p>

```js
addContextMenuItem({label, id, shortcut, onClick, singleObject});
```

#### Description

Retrieves a JavaScript object that describes the object.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| label | true | String | Human-readable label of the new context menu entry |
| id | true | String  | Unique identifier for the new context menu entry |
| shortcut  | true | char[]  | The keyboard-shortcut label to show. Does not register a keyboard listener |
| onClick | true | callback | JS function triggered when menu entry is clicked |
| singleObject | true | boolean | Indicates if the action applies only to single selections |

##### Returns

HTMLDivElement

##### Namespace

GUI

---

### Remove Context Menu Items

<p class="heading-link-container"><a class="heading-link" href="#remove-context-menu-items"></a></p>

```js
removeContextMenuItems({contextMenuItemIds});
```

#### Description

Retrieves a JavaScript object that describes the object.

#### Parameters

| Field Name | Required | Type | Description |
| - | - | - | - |
| contextMenuItemIds | true | String[] | Array of the Context Menu Item Ids to remove |

##### Returns

void

##### Namespace

GUI

---

## Options

<p class="heading-link-container"><a class="heading-link" href="#options"></a></p>

`accessToken [string]`

```js
{
  accessToken: '1234567890abdefghijkl',
}
```

OAuth access token used to authenticate requests to the Procore API made by the Web Viewer SDK on your behalf (e.g. fetching an object's properties). Specifically it adds an `Authorization` header with the provided token to each request. See [Making Your First API Call](/documentation/making-first-call) for details on retrieving an access token.

Note also that this setup implies an Implicit Grant flow in that your access token will be present on the browser rather than only present on a server, which may be a security concern. See [OAuth 2.0 Implicit Grant](/documentation/oauth-implicit-flow) for details on Implicit Grant flow.

If this is not provided as an option, you will need to intercept the SDK's requests and attach the `Authorization` header yourself in order for them to succeed.

Additionally, the access token will eventually expire (in 24 hours currently for an implicitly granted token) and requests made by the SDK will fail. We don't yet have a way to notify of these errors and refresh the in-use access token. One workaround is to keep track of the expiration time for the access token (provided in the `expires_in` query param in the Implicit Grant flow) and re-instantiate the `ProcoreBim.Webviewer` with the new access token.

`baseUrl [string]`

```js
{
  baseUrl: 'https://api.procore.com',
}
```

The `baseUrl` is a mechanism for determining which version of the Procore API you will hit.

For example, while developing a third-party Procore App, you may want to utilize one of the [Sandbox Environments](https://developers.procore.com/documentation/development-environments). To use the Development Sandbox, you could pass `baseUrl: 'https://sandbox.procore.com/'` and any requests made by the SDK will be made to that origin.

Another example is if you want to avoid using the Implicit Grant flow you might set up a server at say `https://auth-proxy.myapp.com` and pass that in as the `baseUrl`. All SDK requests will then be made to your server which could add the `Authorization` header and make the actual request to the Procore API.

`parentElement [Element]` (required)

```js
{
  parentElement: document.getElementById('myViewer');
}
```

DOM node to attach viewer to.

`modelId [string]` (required)

```js
{
  modelId: '999-888-myModel';
}
```

Used for caching.
Must be unique to avoid cache collisions.

`modelRevisionId [string]` (required)

```js
{
  modelRevisionId: '999-888-myModel';
}
```

Used for caching.
Must be unique to avoid cache collisions.

`meshUrl [string]` (required)

```js
{
  meshUrl: 'https://foo.com/geometry/mesh';
}
```

URL to mesh binary.
Provided by a Procore service.

`meshnodeUrl [string]` (required)

```js
{
  meshnodeUrl: 'https://foo.com/geometry/meshnode';
}
```

URL to meshnode binary.
Provided by a Procore service.

`nodeUrl [string]` (required)

```js
{
  nodeUrl: 'https://foo.com/geometry/node';
}
```

URL to node binary.
Provided by a Procore service.

`cellUrl [string]` (required)

```js
{
  cellUrl: 'https://foo.com/geometry/mesh';
}
```

URL to mesh binary.
Provided by a Procore service.

`bcfCamera [Object]`

```js
{
  bcfCamera: {
    perspective_camera: {
      camera_view_point: {
        x:100,
        y:100,
        z:10
      },
      camera_direction: {
        x:0,
        y:1,
        z:0
      },
      camera_up_vector: {
        x:0,
        y:0,
        z:1
      },
      field_of_view: 1.3,
      target_distance: 1000000
    }
  }
}
```

Initializes the Webviewer with the camera.

`min_boundary [Object]`

```js
{
  min_boundary: {
      z:"-14.1686084710",
      y:"20.1924446284",
      x:"-26.6485348162"
  }
}

```

Defines the minimum boundary of the model.
If `max_boundary` is also defined, both `min_boundary` and `max_boundary` are used to create a section box which will only render objects within that section box.

`max_boundary [Object]`

```js
{
  max_boundary: {
      z:"11.8769418043",
      y:"155.7780451539",
      x:"17.0583084307"
  }
}
```

Defines the maximum boundary of the model.
If `min_boundary` is also defined, both `max_boundary` and `min_boundary` are used to create a section box which will only render objects within that section box.

`rotation [Object]`

```js
{
  rotation: {
      z:"11.8769418043",
      y:"155.7780451539",
      x:"17.0583084307"
  }
}
```

If `min_boundary` and `max_boundary` are defined, then you can also set the rotation of the section box.

`multiselect [boolean]`

```js
{
  multiselect: false;
}
```

Sets the object selection mode.

`tools [Array]`

```js
[
  ProcoreBim.Webviewer.tools.BOTTOMTOOL,
  ProcoreBim.Webviewer.tools.COACHMARKS,
  ProcoreBim.Webviewer.tools.MEASUREMENT_SD
];
```

Pre-built tools to be enabled.

This array can be composed of both constants and objects.
You can use objects to set tool specific options.
When an object is passed, the object MUST have the key, type and the value be the tool name.
Other keys in this object are options you want to set.

For example:

```js
[
  ProcoreBim.Webviewer.tools.BOTTOMTOOL,
  { type: ProcoreBim.Webviewer.tools.MEASUREMENT_SD, center_lock: true }
];
```

See [Tools](#tools) for further information.

## Objects

<p class="heading-link-container"><a class="heading-link" href="#objects"></a></p>

### Perspective Camera Object

<p class="heading-link-container"><a class="heading-link" href="#perspective-camera-object"></a></p>

```js
{
  perspective_camera: {
    camera_view_point:  {x: Number, y: Number, z: Number},
    camera_direction:  {x: Number, y: Number, z: Number},
    camera_up_vector:  {x: Number, y: Number, z: Number},
    field_of_view: Number,
    target_distance: Number
  }
}
```

### Orthogonal Camera Object

<p class="heading-link-container"><a class="heading-link" href="#orthogonal-camera-object"></a></p>

```js
{
  orthogonal_camera: {
    camera_view_point: {x: Number, y: Number, z: Number},
    camera_direction: {x: Number, y: Number, z: Number},
    camera_up_vector: {x: Number, y: Number, z: Number},
    view_to_world_scale: Number,
    target_distance: Number,
    vertical_extent: Number
  }
}
```

### Meshnode

<p class="heading-link-container">
  <a class="heading-link" href="#meshnode"></a>
</p>

```js
{
  bbox: Float32Array(6),
  matrix: Float32Array(12),
  meshData: [
    {
      byteLength: Number,
      color: Number,
      faces: Uint16Array(n),
      offset: Number,
      opacity: Number,
      vertices: Float32Array(n)
    }
  ]
}
```

### BCF Clipping Plane

<p class="heading-link-container">
  <a class="heading-link" href="#bcf-clipping-plane"></a>
</p>

The BCF Clipping Plane is based off of the BCF schema defined here: https://github.com/buildingSMART/BCF-API#3526-clipping-plane

The one addition we've made is the `unit` field. If the `unit` is not present, we will assume it to be `'ft'`.

```ts
{
  unit?: string; // Assumed to be "ft" if not present.
  direction: {
    x: number;
    y: number;
    z: number;
  };
  location: {
    x: number;
    y: number;
    z: number;
  }
}
```

### Autodesk Section Data

<p class="heading-link-container">
  <a class="heading-link" href="#autodesk-section-data"></a>
</p>

```ts
{
  Type: 'ClipPlaneSet';
  Version: 1;
  Unit?: string;
  OrientedBox?: {
    Type: 'OrientedBox3D';
    Version: 1;
    Box: [
      [number, number, number], // [minX, minY, minZ]
      [number, number, number]  // [maxX, maxY, maxZ]
    ];
    Rotation: [number, number, number]; // [degX, degY, degZ]
  } | null;
  Planes?: {
    Type: 'ClipPlane';
    Version: 1;
    Normal: [number, number, number]; // [dirX, dirY, dirZ]
    Distance: number;
    Enabled: boolean;
  }[] | null;
  Linked: boolean;
  Enabled: boolean;
};
```

### Urls Object

<p class="heading-link-container">
  <a class="heading-link" href="#urls-object"></a>
</p>

```js
{
  meshUrl: String,
  meshnodeUrl: String,
  nodeUrl: String,
  cellUrl: String
}
```

### Constants

<p class="heading-link-container">
  <a class="heading-link" href="#constants"></a>
</p>

### Tools

<p class="heading-link-container">
  <a class="heading-link" href="#tools"></a>
</p>

`ProcoreBim.Webviewer.tools.{tool_type}`

| Tool             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| BOTTOMTOOL       | Adds the bottom toolbar that will house other enabled tools |
| COACHMARKS       | All coachmarks                                              |
| COACHMARKSECTION | Section Applied coachmark label                             |
| COACHMARKSHIDDEN | Hidden Objects coachmark label                              |
| CONTEXTMENU      | Right click context menu                                    |
| FLOORPLAN        | Adds 2D Navigation minimap and modal                        |
| LOADING          | Adds loading screens for viewer initialization              |
| MEASUREMENT_SD   | Shortest Distance tool                                      |
| MODELVIEWS       | Views Window                                                |
| SETTINGS         | Settings Window to change unit display                      |
| VIEW_PROPERTIES  | Properties Window to display properties of an object        |
| OBJECTMODELTREE  | Object Tree Window                                          |
| XRAY_MODE        | Adds button to toggle Xray Mode                             |
| SECTION_BOX      | Adds button to toggle interactive Section Box               |

`MEASUREMENT_SD`

| Option      | Type    | Description                                                                                                                                         |
| ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| center_lock | Boolean | Enables or disables the measurement navigation mode. Set to false if you don't want the navigation to change in anyway after a measurement is made. |

<!-- markdownlint-enable no-inline-html -->

## Migration Guides

<p class="heading-link-container">
  <a class="heading-link" href="#migration-guides"></a>
</p>

### v7 to v8

<p class="heading-link-container">
  <a class="heading-link" href="#v7-to-v8"></a>
</p>

#### Coordinates Should Be Consistent with the Source File

Several methods were returning/expecting to receive coordinates that were not consistent with the model coordinates from the source file. Prior to this change, to get the correct coordinates you would need to add the result of `model.getGlobalOffset` to them. This would affect models that are significantly offset from the origin, which we refer to as being in "world coordinates". As of this change, most instances of not returning "world coordinates" have been fixed.

The changed methods:

- `camera.getPosition` now returns a point in world coordinates.
- `camera.setPosition` now expects a point in world coordinates.
- `camera.getLookAt` now returns a point in world coordinates.
- `camera.setLookAt` now expects a point in world coordinates.
  - NOTE: this method has a return value that is still NOT in world coordinates. Prefer using `camera.getPosition/getLookAt/getBcfCamera` if you want the resulting position after a set.
- `camera.getBcfCamera`'s return value's `camera_view_point` is now in world coordinates.
- `camera.setBcfCamera` took a second boolean argument that defaulted to receiving local coordinates. If you were passing `false` or nothing here it will no longer be consistent with the coordinates from other methods. If you were passing `true` then no change required.
- `model.ModelToMapSpace` now expects a `point` parameter in world coordinates.

If you were saving data returned from these, that data may now be inconsistent if there is a global offset (i.e. if `model.getGlobalOffset` is a non-zero vector) for that model. This can result in behavior where setting the camera position with `setPosition` may be very far away from the actual model. To migrate the old data you would need to translate by the `model.getGlobalOffset` to be in the correct coordinate system.

#### `model.getSections` Now Requires Format Parameter

Calling `model.getSections()` without argument will now throw an error. You must pass either `"autodesk"` or `"bcf"`.

The previous return shape looked like this:

```ts
  {
    type: "box",
    box:
    {
      min:{ x: Number, y: Number, z: Number},
      max:{ x: Number, y: Number, z: Number},
      rotation: undefined | Number
    }
  } 
| {
  type: "plane",
  plane:
  [
    {
      distance: Number,
      normal: {normalX: Number, normalY: Number, normalZ: Number},
      uuid: String
    }
  ]
}
```

In this format you would get a different shape based on whether section planes or a section box had been set. This format is no longer available so you will need to convert your code to one of the new formats if you were using it.

The `"autodesk"` format is closer to the previous return shape in that it supports both a box return type and a plane return type. For historical reasons, it is also the format that most section data in Procore is stored in. See [Autodesk Section Data object](#autodesk-section-data).

The `"bcf"` format is a bit less esoteric, but will always return an array of planes even if you had set a box. See [BCF clipping plane](#bcf-clipping-plane).

##### Conversion Scripts

If you have stored the data previously returned by `model.getSections()` you may consider converting that data to one of the new formats. For example, if you wanted to create a [Procore Coordination Issue](https://developers.procore.com/reference/rest/v1/coordination-issues?version=1.0#create-coordination-issue) with section data you had been storing, at the time of this writing you would need to convert the old data to the autodesk format.

Alternatively you may need to convert to BCF to interoperate with other systems.

The scripts here are a starting off point to help with such conversions. However, please test them on your own systems and validate that they handle your data.

##### Conversion Script: Old Format to `"autodesk"`

```js
const convertOldSectionDataToAutodesk = (oldSectionData) => {
  if (oldSectionData.type === 'box') {
    const {
      box: { min, max },
    } = oldSectionData;
    let {
      box: { rotation },
    } = oldSectionData;
    if (rotation === null) {
      rotation = { x: 0, y: 0, z: 0 };
    }
    return {
      Type: 'ClipPlaneSet',
      Version: 1,
      Unit: 'ft',
      OrientedBox: {
        Type: 'OrientedBox3d',
        Version: 1,
        Box: [
          [min.x, min.y, min.z],
          [max.x, max.y, max.z],
        ],
        Rotation: [rotation.x, rotation.y, rotation.z],
      },
      Planes: null,
      Enabled: true,
      Linked: false,
    };
  }
  if (oldSectionData.type === 'plane') {
    return {
      Type: 'ClipPlaneSet',
      Version: 1,
      Unit: 'ft',
      OrientedBox: null,
      Planes: oldSectionData.plane.map((plane) => {
        const { normal, distance } = plane;
        return {
          Type: 'ClipPlane',
          Version: 1,
          Normal: [normal.normalX, normal.normalY, normal.normalZ],
          Distance: distance,
          Enabled: true,
        };
      }),
      Enabled: true,
      Linked: false,
    };
  }
  throw new Error(`Unrecognized old section data type: ${oldSectionData.type}`);
};
```

##### Conversion Script: Old Format to `"bcf"`

This one is a little tricky in the case of converting box data to planes. If this is your use case please reach out and we'll find a way to expose this more easily.

```js
const convertOldSectionDataToBcf = (oldSectionData) => {
  if (oldSectionData.type === 'box') {
    throw new Error('Please reach out if you need assistance with this use case. It requires a math library or more code than is reasonable to put here.');
  }
  if (oldSectionData.type === 'plane') {
    return oldSectionData.plane.map((plane) => {
      const { normal, distance } = plane;
      return {
        unit: 'ft',
        direction: {
          x: normal.normalX,
          y: normal.normalY,
          z: normal.normalZ,
        },
        location: {
          x: -normal.normalX * distance + 0, // Add 0 to avoid -0 values.
          y: -normal.normalY * distance + 0,
          z: -normal.normalZ * distance + 0,
        },
      };
    });
  }
  throw new Error(`Unrecognized old section data type: ${oldSectionData.type}`);
};
```

### v6 to v7

<p class="heading-link-container">
  <a class="heading-link" href="#v6-to-v7"></a>
</p>

#### Changes to Payloads of `objectSelect` and `objectSingleClick` Events

##### New Payload

In versions < v7 the `objectSelect` and `objectSingleClick` events had a payload of the meshnode index that was clicked. They now have a new shape that is based around object id instead of meshnode index.

The new shape looks like this:
```ts
{
  objectId: 3,
  selectionContainerId: 2,
  ancestry: [
    { 
      id: 1,
      parentId: undefined,
      children: [
        { id: 2, parentId: 1, children: [3, 42] },
      ],
    },
    { 
      id: 2,
      parentId: 1,
      children: [
        { id: 3, parentId: 2, children: [] },
        { id: 42, parentId: 2, children: [] },
      ] 
    },
    { 
      id: 3,
      parentId: 2,
      children: [],
    },
  ]
}
```

The `objectId` is the object id of the object that was clicked/selected

The `selectionContainerId` is the object id of the object that contains the object that was clicked/selected. In v7 this will always be the "First Object".

The `ancestry` attribute is intended to tell you all the information needed to recreate the subtree for what was clicked/selected. Each item in the array represents a depth of the object tree, starting at the root object and going down to the leaf object that was clicked/selected. The shape of these objects is the same that is returned by `model.getObject` with the one exception that the first level of children are fully materialized objects instead of just being object ids. This is to capture the siblings of each item without an additional request as these would be displayed as closed items in an object tree implementation (object id 42 in the example above.)

See [`objectSelect`](#objectselect) or [`objectSingleClick`](#objectsingleclick) for more details on these payloads.

##### Converting from Old Payload

We encourage building around object ids moving forward, but if you need a straight conversion of the new payload to the previous one you could modify event listeners on `objectSelect` or `objectSingleClick` like so:

```ts
viewer.events.addEventListener('objectSelect', async (payload) => {
  const { objectId } = payload;
  const { meshnodeIndex } = await viewer.model.getMeshnodeFromObjectId(objectId)

  // meshnodeIndex should be the same as the < v7 payload.
})
```

### v5 to v6

<p class="heading-link-container">
  <a class="heading-link" href="#v5-to-v6"></a>
</p>

Methods in the model namespace have been renamed to better match what they return and what type of parameters they expect. Primarily this has meant clarifying that the particular type of "id" that these methods expect is a "meshnode index". To be clear: there is no behavior change of these methods, they have only been renamed and will continue to work as they have been.

#### Method Renames

To migrate you can safely do a find a replace for each of these renamed methods:

```
model.getObject => model.getMeshnode
model.getObjectFromPropertyId => model.getMeshnodeFromObjectId
model.getHiddenGeoIds => model.getHiddenMeshnodeIndices
model.addHiddenGeoIds => model.addHiddenMeshnodeIndices
model.hasHiddenGeoIds => model.hasHiddenMeshnodeIndices
model.clearHiddenIds => model.clearHiddenMeshnodeIndices
model.getSelectedGeoIds => model.getSelectedMeshnodeIndices
model.addSelectedIds => model.addSelectedMeshnodeIndices
model.hasSelectedIds => model.hasSelectedMeshnodeIndices
model.clearSelectedIds => model.clearSelectedMeshnodeIndices
model.setObjectColor => model.setMeshnodeColor
```

Usages of `model.getModelItemBoundary` can be found and replaced with a call to `model.getMeshnode`.

```
model.getModelItemBoundary(meshnodeIndex) => model.getMeshnode(meshnodeIndex).bbox
```

#### Reasoning

These methods referred to `object`, `objectId`, `propertyId`, `geoId`, and simply `id`. There are two issues with this: (1) There are multiple names for the same thing. As it currently stands, most things are actually referring to a `meshnodeIndex` or a `meshnode`. (2) What we referred to as an `object`, e.g. what’s returned from the old `getObject`, is not what the BIM Rest API refers to as an object. We believe these method renames will bring more clarity to how to use them in your own code.

#### Future Plans

We intend to release another set of methods that operate on objects (of which meshnodes are a subtype) and object ids rather than directly on meshnodes and meshnode indices. These object methods will be released in a non-breaking way and the meshnode methods will continue to work. However, the meshnode methods may eventually be deprecated or become considered internal, meaning they are not subject to semver.

### v4 to v5

<p class="heading-link-container">
  <a class="heading-link" href="#v4-to-v5"></a>
</p>

New `camera.zoomTo*` methods were added and the naming of `camera.zoomExtents` (added in v3.1.0) no longer really made sense.

#### Method Renames

To migrate you can safely do a find a replace for each of these renamed methods:

```
camera.zoomExtents => camera.zoomToBoundingBox
```

### v3 to v4

<p class="heading-link-container">
  <a class="heading-link" href="#v3-to-v4"></a>
</p>

There were no actual API changes that necesitated a breaking change here but we did drastically change our rendering algorithm to reduce flashing and dropout. For larger models this may come at the expense of low framerates.

I have the privilege of writing this migration guide from the future and can tell you that we've been able to make it even better without (as much) of a framerate hit for larger models in v6.0.1 and you should consider upgrading to that or later. v3 to v4 may also not have needed a breaking change in retrospect so you can safely go from v3 to v4 without your code breaking but know that rendering will behave and perform differently and hopefully mostly for the better on v4 (but again vastly better on v6).
