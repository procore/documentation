---
permalink: /bim-web-viewer
title: "Procore BIM Web Viewer: Integrator Documentation"
layout: default
section_title: Other Procore APIs
---

<!-- markdownlint-disable no-inline-html -->

## Getting started

<p class="heading-link-container"><a class="heading-link" href="#getting-started"></a></p>

The Procore BIM Web Viewer is a single distributable Javascript file.

Instantiate the viewer with the options argument, and start rendering when ready.

- Add `<script type='text/javascript' src='dist/Procore.Bim.Webviewer.js'></script>` to your page
- Instantiate a new viewer with options: `const viewer = new ProcoreBim.Webviewer(options);`
- Start the viewer: `viewer.start();`

See the [Options](#options) section for more detail on the options object.

## Other Considerations

<p class="heading-link-container"><a class="heading-link" href="#other-considerations"></a></p>

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
| camera    | Webviewer camera retrieval and manipulation [Camera Namespace](#camera-namespace)             |
| dom       | Helper methods to create extendable panels [Dom Namespace](#dom-namespace)                    |
| events    | Event management system similar to Javascript Event API [Events Namespace](#events-namespace) |
| model     | Webviewer model data retrieval and manipulation [Model Namespace](#model-namespace)           |
| none      | Methods not grouped into a namespace                                                          |

When you create a new instance of Webviewer, an object is returned that allows you to act on the model and camera data.
Acting on these methods is done through dot notation.
Some methods belong to a sub namespace, and some methods do not.

```
const viewer = new ProcoreBim.Webviewer(options);
viewer.start();
```

Here, there Webviewer has been isntanced and we have invoked start which does not belong to a namespace to start initializing the model viewer.

```
viewer.camera.setPosition(1, 10, -1);
```

Here we invoke `setPosition` method from the camera namespace to set the camera position in the model viewer.

The `Cache` namespace contains static methods and has the following pattern:

```
ProcoreBim.Cache.{method_name}
```

#### Complete Example

```
const viewer = new ProcoreBim.Webviewer(options);

//Starts the viewer, must be called.
`start` does not belong to a namespace.
viewer.start();

//Gets the camera direction, `getCameraDirection()` belongs to
// the `camera` namespace.
var cameraDirection = viewer.camera.getCameraDirection();

//Checks if the model is cached, `hasModel` returns a promise
// and belongs to the `Cache` namespace.
ProcoreBim.Cache.hasModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell',
}).then(function(isCached) {
  console.log(isCached);
});
```

## General API

<p class="heading-link-container"><a class="heading-link" href="#general-api"></a></p>

### Starting the Webviewer

<p class="heading-link-container"><a class="heading-link" href="#starting-the-webviewer"></a></p>

```
start();
```

#### Description

Entry point to the Webviewer and starts rendering.
This method must be called.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

None

---

Terminating the Webviewer

```
terminate();
```

#### Description

Stops rendering, frees memory, and removes webviewer from parent element.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

None

## Camera Namespace

<p class="heading-link-container"><a class="heading-link" href="#camera-namespace"></a></p>

### Get Camera Position

<p class="heading-link-container"><a class="heading-link" href="#get-camera-position"></a></p>

```
getPosition();
```

#### Description

Retrieves the active camera position.

#### Parameters

None

##### Returns

```
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Set Camera Position

<p class="heading-link-container"><a class="heading-link" href="#set-camera-position"></a></p>

```
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

```
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

```
getCameraDirection();
```

#### Description

Retrieves the direction vector for the active camera target.

#### Parameters

None

##### Returns

```
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Set Camera Look At

<p class="heading-link-container"><a class="heading-link" href="#set-camera-look-at"></a></p>

```
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

```
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

```
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

```
{x: Number, y: Number, z: Number}
```

##### Namespace

Camera

---

### Get Snapshot

<p class="heading-link-container"><a class="heading-link" href="#get-snapshot"></a></p>

```
getSnapshot(color);
```

#### Description

Force download the current render view into a png.

#### Parameters

| Field Name | Required | Type   | Description                                                                  |
| ---------- | -------- | ------ | ---------------------------------------------------------------------------- |
| color      | false    | String | Background css color, can use hex value ('#00ff00'), or color labels ('red') |

##### Returns

```
undefined
```

##### Namespace

Camera

---

### Set Camera From BCF Camera

<p class="heading-link-container"><a class="heading-link" href="#set-camera-from-bcf-camera"></a></p>

```
setBcfCamera(bcfCamera);
```

#### Description

Sets the camera position and direction from BCF camera data.
See [Orthogonal Camera](#orthogonal-camera-object) or [Perspective Camera](#perspective-camera-object)

#### Parameters

| Field Name | Required | Type   | Description            |
| ---------- | -------- | ------ | ---------------------- |
| bcfCamera  | true     | Object | A BCF formatted object |

##### Returns

```
undefined
```

##### Namespace

Camera

---

### Get BCF Camera From Camera

<p class="heading-link-container"><a class="heading-link" href="#get-bcf-camera-from-camera"></a></p>

```
getBcfCamera();
```

#### Description

Retrieves a BCF perspective camera.
See [Perspective Camera](#perspective-camera-object)

#### Parameters

None

##### Returns

```
{Object}
```

##### Namespace

Camera

---

### Navigation to the home viewpoint

<p class="heading-link-container"><a class="heading-link" href="#navigation-to-the-home-viewpoint"></a></p>

```
navToHomeView();
```

#### Description

Navigation to the home viewpoint if the Bcf camera been set in the options object.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

Camera

---

### Set Euler Angles

<p class="heading-link-container"><a class="heading-link" href="#set-euler-angles"></a></p>

```
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

```
undefined
```

##### Namespace

Camera

## DOM Namespace

<p class="heading-link-container"><a class="heading-link" href="#dom-namespace"></a></p>

### Add Panel

<p class="heading-link-container"><a class="heading-link" href="#add-panel"></a></p>

```
addPanel(domElement);
```

#### Description

Adds a container div to the Webviewer canvas and appends `Element` to it.

#### Parameters

| Field Name | Required | Type        | Description                                                           |
| ---------- | -------- | ----------- | --------------------------------------------------------------------- |
| domElement | true     | HTMLElement | The DOM element that makes up the panel to be appended to the viewer. |

##### Returns

```
boolean
```

##### Namespace

Dom

---

### Remove Panel

<p class="heading-link-container"><a class="heading-link" href="#remove-panel"></a></p>

```
removePanel(domElement);
```

#### Description

Removes the container div from the viewer which contains the argument `Element`.

#### Parameters

| Field Name | Required | Type        | Description                                                            |
| ---------- | -------- | ----------- | ---------------------------------------------------------------------- |
| domElement | true     | HTMLElement | The DOM element that makes up the panel to be removed from the viewer. |

##### Returns

```
boolean
```

##### Namespace

Dom

## Events Namespace

<p class="heading-link-container"><a class="heading-link" href="#events-namespace"></a></p>

Supported events are:

| Event                  | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `appResize`            | The window has resized.                                                                      |
| `appStart`             | The first event that occurs, after .start() is called.                                       |
| `cameraUpdated`        | The camera rotation or position has changed.                                                 |
| `serviceWorkerReady`   | Service worker has been installed and is listening for events.                               |
| `doubleClick`          | A double click has occurred anywhere on the canvas. Value: `Event`                           |
| `downloadComplete`     | File retrieval has completed.                                                                |
| `downloadProgress`     | File retrieval progress tick.                                                                |
| `downloadStart`        | File retrieval has started.                                                                  |
| `selectTool`           | Fires whenever a tool has been enabled.                                                      |
| `navigationChanged`    | The navigation mode for the model has changed.                                               |
| `objectDoubleClick`    | A double click has occurred on an object. Value: `objectId`                                  |
| `objectRightClick`     | A right click has occurred on an object. Value: `objectId`                                   |
| `objectSingleClick`    | A single click has occurred on an object. Value: `objectId`                                  |
| `objectHide`           | An object was hidden. Value: `objectId`                                                      |
| `hideUpdated`          | Hidden set of objects has changed.                                                           |
| `objectSelect`         | An object was selected. Value: `objectId`                                                    |
| `optionsChanged`       | Configuration options for the viewer have been modified. Value: `options`                    |
| `canvasReady`          | Loading canvas is ready. Value: `<canvas>`                                                   |
| `renderReady`          | Rendering canvas has loaded and is prepared to animate. Value: `renderReady`                 |
| `rightClick`           | A right click has occurred anywhere on the canvas. Value: `Event`                            |
| `singleClick`          | A single click has occurred anywhere on the canvas. Value: `Event`                           |
| `messages`             | Internal Warnings and Errors are published to this event.                                    |
| `sectionBoxSet`        | Section Box has been applied.                                                                |
| `sectionBoxRemoved`    | Section Box has been removed.                                                                |
| `sectionPlaneAdded`    | Section Plane has been applied.                                                              |
| `sectionPlaneRemoved`  | Section Plane has been removed.                                                              |
| `sectionsCleared`      | All section boxes and planes have been removed.                                              |
| `drawingMiniClick`     | The 2D Navigation mini map was clicked.                                                      |
| `drawingNavigated`     | After camera has been updated through 2D Navigation                                          |
| `measured`             | Fired after completion of shortest distance calculation                                      |
| `objectMeasure`        | An object was selected for measurement. Value: `objectId`                                    |
| `bcfCameraSet`         | Fired after the BCF Camera has been set.                                                     |
| `intersectPointClick`  | Fires after mouse click with point of intersection on the closest object of last mouse click |
| `isolateCompleted`     | Fired after `Isolate` and after all the objects except the active object are hidden          |
| `hideSimilarCompleted` | Fired after `Hide Similar` and after all the objects except the active object are hidden     |

---

### Add Event

<p class="heading-link-container"><a class="heading-link" href="#add-event"></a></p>

```
addEventListener(eventName, callback);
```

#### Description

Executes a callback when an internal viewer event occurs.

#### Parameters

| Field Name | Required | Type     | Description                         |
| ---------- | -------- | -------- | ----------------------------------- |
| eventName  | true     | String   | Name of the event                   |
| callback   | true     | Function | Function to evoke when event occurs |

##### Returns

```
undefined
```

##### Namespace

Events

---

### Remove Event

<p class="heading-link-container"><a class="heading-link" href="#remove-event"></a></p>

```
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

```
undefined
```

##### Namespace

Events

---

### Dispatch Event

<p class="heading-link-container"><a class="heading-link" href="#dispatch-event"></a></p>

```
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

```
undefined
```

##### Namespace

Events

## Model Namespace

<p class="heading-link-container"><a class="heading-link" href="#model-namespace"></a></p>

### Get Object from object id

<p class="heading-link-container"><a class="heading-link" href="#get-object-from-object-id"></a></p>

```
getObject(objectId);
```

#### Description

Retrieves a JavScript object that describes the object.

#### Parameters

| Field Name | Required | Type   | Description      |
| ---------- | -------- | ------ | ---------------- |
| objectId   | true     | Number | ID of the object |

##### Returns

See [Model Object](#model-object).

##### Namespace

Model

---

### Get Hidden ID's

<p class="heading-link-container"><a class="heading-link" href="#get-hidden-ids"></a></p>

```
getHiddenGeoIds();
```

#### Description

Retrieves a list of object IDs that are currently hidden.

#### Parameters

None

##### Returns

```
Array[Number]
```

##### Namespace

Model

---

### Add Hidden ID's

<p class="heading-link-container"><a class="heading-link" href="#add-hidden-ids"></a></p>

```
addHiddenGeoIds(objectIds);
```

#### Description

Hides Object ID's.
Does not clear previous hiding(s).

#### Parameters

| Field Name | Required | Type          | Description          |
| ---------- | -------- | ------------- | -------------------- |
| objectIds  | true     | Array[Number] | Array of Object ID's |

##### Returns

```
Set(Number)
```

##### Namespace

Model

---

### Has Hidden ID's

<p class="heading-link-container"><a class="heading-link" href="#has-hidden-ids"></a></p>

```
hasHiddenGeoIds(objectIds);
```

#### Description

Checks if passed object IDs are hidden.
Returns `true` is all the Object ID's in the array are hidden.
Otherwise `false` is returned if at least one Object is not hidden.

#### Parameters

| Field Name | Required | Type          | Description          |
| ---------- | -------- | ------------- | -------------------- |
| objectIds  | true     | Array[Number] | Array of Object ID's |

##### Returns

```
boolean
```

##### Namespace

Model

---

### Clear Hidden ID's

<p class="heading-link-container"><a class="heading-link" href="#clear-hidden-ids"></a></p>

```
clearHiddenIds();
```

#### Description

Clear hidden array list.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

Model

---

### Get Selected ID's

<p class="heading-link-container"><a class="heading-link" href="#get-selected-ids"></a></p>

```
getSelectedGeoIds();
```

#### Description

Retrieves a list of Object ID's that are currently selected.

#### Parameters

None

##### Returns

```
Array[Number]
```

##### Namespace

Model

---

### Add Selected ID's

<p class="heading-link-container"><a class="heading-link" href="#add-selected-ids"></a></p>

```
addSelectedIds(objectIds);
```

#### Description

Selects Object ID's.
Does not clear previous selection(s).

#### Parameters

| Field Name | Required | Type          | Description          |
| ---------- | -------- | ------------- | -------------------- |
| objectIds  | true     | Array[Number] | Array of Object ID's |

##### Returns

```
undefined
```

##### Namespace

Model

---

### Has Selected ID's

<p class="heading-link-container"><a class="heading-link" href="#has-selected-ids"></a></p>

```
hasSelectedIds(objectIds);
```

#### Description

Checks if passed Object ID's are selected.
Returns `true` is all the Object ID's in the array are selected.
Otherwise `false` is returned if at least one Object is not selected.

#### Parameters

| Field Name | Required | Type          | Description          |
| ---------- | -------- | ------------- | -------------------- |
| objectIds  | true     | Array[Number] | Array of Object ID's |

##### Returns

```
boolean
```

##### Namespace

Model

---

### Clear Selected ID's

<p class="heading-link-container"><a class="heading-link" href="#clear-selected-ids"></a></p>

```
clearSelectedIds();
```

#### Description

Deselects all objects.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

Model

---

### Set Object Color

<p class="heading-link-container"><a class="heading-link" href="#set-object-color"></a></p>

```
setObjectColor(objectId, hexColor, opacity);
```

#### Description

Overrides the color of an object.

#### Parameters

| Field Name | Required | Type   | Description |
| ---------- | -------- | ------ | ----------- |
| objectId   | true     | Number | Object Id   |
| hexColor   | true     | String | Hex Color   |
| opacity    | true     | Number | Opacity     |

##### Returns

```
undefined
```

##### Namespace

Model

---

### Get Sections

<p class="heading-link-container"><a class="heading-link" href="#get-sections"></a></p>

```
getSections();
```

#### Description

Returns a collection of section planes or a section box, whichever has been applied.

#### Parameters

None

##### Returns

See [sectionPlane](#section-plane-object) and [sectionBox](#section-box-object)

##### Namespace

Model

---

### Set Section Box

<p class="heading-link-container"><a class="heading-link" href="#set-section-box"></a></p>

```
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

```
undefined
```

##### Namespace

Model

---

### Remove Section Box

<p class="heading-link-container"><a class="heading-link" href="#remove-section-box"></a></p>

```
removeSectionBox();
```

#### Description

Removes section box.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

Model

---

### Add Section Plane

<p class="heading-link-container"><a class="heading-link" href="#add-section-plane"></a></p>

```
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

```
undefined
```

##### Namespace

Model

---

### Remove Section Plane

<p class="heading-link-container"><a class="heading-link" href="#remove-section-plane"></a></p>

```
removeSectionPlane(uuid);
```

#### Description

Removes a single section plane.

#### Parameters

| Field Name | Required | Type   | Description                                |
| ---------- | -------- | ------ | ------------------------------------------ |
| uuid       | true     | string | Remove a specific section plane with uuid. |

##### Returns

```
undefined
```

##### Namespace

Model

---

### Clear Sections

<p class="heading-link-container"><a class="heading-link" href="#clear-sections"></a></p>

```
clearSection();
```

#### Description

Removes all sections, planes and boxes.

#### Parameters

None

##### Returns

```
undefined
```

##### Namespace

Model

---

### Set Webviewer Configuration options

<p class="heading-link-container"><a class="heading-link" href="#set-webviewer-configuration-options"></a></p>

```
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

```
undefined
```

##### Namespace

Model

---

### Get relative planmap space position based on model space position

<p class="heading-link-container"><a class="heading-link" href="#get-relative-planmap-space-position-based-on-model-space-position"></a></p>

```
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

```
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

```
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

```
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

```
getGlobalOffset();
```

#### Description

Retrieves the global offset, if there is one.

#### Parameters

None

##### Returns

```
{offsetX: Number, offsetY: Number, offsetZ: Number}
```

##### Namespace

Model

## Cache Namespace

<p class="heading-link-container"><a class="heading-link" href="#cache-namespace"></a></p>

### Is the model cached

<p class="heading-link-container"><a class="heading-link" href="#is-the-model-cached"></a></p>

```
hasModel(urlsObject);
```

#### Description

Checks if the internal caching system contains model data for an array of urls.

#### Parameters

| Field Name | Required | Type   | Description                     |
| ---------- | -------- | ------ | ------------------------------- |
| urlsObject | true     | Object | See [Urls Object](#urls-object) |

#### Example

```
ProcoreBim.Cache.hasModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell',
}).then(function(isCached) {
  console.log(isCached);
});
```

##### Returns

```
Promise(Boolean)
```

---

### Remove Model

<p class="heading-link-container"><a class="heading-link" href="#remove-model"></a></p>

```
removeModel(urlsObject);
```

#### Description

Remove model data for an array of urls.

#### Parameters

| Field Name | Required | Type   | Description                     |
| ---------- | -------- | ------ | ------------------------------- |
| urlsObject | true     | Object | See [Urls Object](#urls-object) |

#### Example

```
ProcoreBim.Cache.removeModel({
  meshUrl: 'samples/vortex.mesh',
  meshnodeUrl: 'samples/vortex.meshnode',
  nodeUrl: 'samples/vortex.node',
  cellUrl: 'samples/vortex.cell',
}).then(function(modelRemoved) {
  console.log(modelRemoved);
});
```

##### Returns

```
Promise(boolean)
```

## Options

<p class="heading-link-container"><a class="heading-link" href="#options"></a></p>

`version [number]` (required)

```
{
  version: 1;
}
```

The version of the Webviewer which is being used.

`parentElement [Element` (required)

```
{
  parentElement: document.getElementById('myViewer');
}
```

DOM node to attach viewer to.

`modelId [string]` (required)

```
{
  modelId: '999-888-myModel';
}
```

Used for caching.
Must be unique to avoid cache collisions.

`modelRevisionId [string]` (required)

```
{
  modelRevisionId: '999-888-myModel';
}
```

Used for caching.
Must be unique to avoid cache collisions.

`meshUrl [string]` (required)

```
{
  meshUrl: 'https://foo.com/geometry/mesh';
}
```

URL to mesh binary.
Provided by a Procore service.

`meshnodeUrl [string]` (required)

```
{
  meshnodeUrl: 'https://foo.com/geometry/meshnode';
}
```

URL to meshnode binary.
Provided by a Procore service.

`nodeUrl [string]` (required)

```
{
  nodeUrl: 'https://foo.com/geometry/node';
}
```

URL to node binary.
Provided by a Procore service.

`cellUrl [string]` (required)

```
{
  cellUrl: 'https://foo.com/geometry/mesh';
}
```

URL to mesh binary.
Provided by a Procore service.

`bcfCamera [Object]`

```
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

`swEnable [boolean]`

```
{
  swUrl: true;
}
```

Enables Service Worker for internal caching.

`swUrl [string]`

```
{
  swUrl: 'https://foo/service_worker.js';
}
```

Sets the Service Worker URL.
If not set, defaults to `/sw.js`

`swScope [string]`

```
{
  swUrl: '/app/';
}
```

Sets the scope of the service worker

`min_boundary [Object]`

```
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

```
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

```
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

```
{
  multiselect: false;
}
```

Sets the object selection mode.

`tools [Array]`

```
[
  ProcoreBim.Webviewer.tools.BOTTOMTOOL,
  ProcoreBim.Webviewer.tools.COACHMARKS,
  ProcoreBim.Webviewer.tools.MEASUREMENT_SD,
];
```

Pre-built tools to be enabled.

This array can be composed of both constants and objects.
You can use objects to set tool specific options.
When an object is passed, the object MUST have the key, type and the value be the tool name.
Other keys in this object are options you want to set.

For example:

```
[
  ProcoreBim.Webviewer.tools.BOTTOMTOOL,
  { type: ProcoreBim.Webviewer.tools.MEASUREMENT_SD, center_lock: true },
];
```

See [Tools](#tools) for further information.

## Objects

<p class="heading-link-container"><a class="heading-link" href="#objects"></a></p>

### Perspective Camera Object

<p class="heading-link-container"><a class="heading-link" href="#perspective-camera-object"></a></p>

```
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

```
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

### Model Object

<p class="heading-link-container">
  <a class="heading-link" href="#model-object"></a>
</p>

```
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

### Section Plane Object

<p class="heading-link-container">
  <a class="heading-link" href="#section-plane-object"></a>
</p>

The key `plane` is an array of planes added.

```
{
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

### Section Box Object

<p class="heading-link-container">
  <a class="heading-link" href="#section-box-object"></a>
</p>

If `rotation` is applied, `rotation` will be represented as Euler angle of type Number.
Otherwise, `rotation` will be undefined.

```
{
  type: "box",
  box:
  {
    min:{ x: Number, y: Number, z: Number},
    max:{ x: Number, y: Number, z: Number},
    rotation: undefined | Number
  }
}
```

### Urls Object

<p class="heading-link-container">
  <a class="heading-link" href="#urls-object"></a>
</p>

```
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
| FLOORPLAN        | Adds 2D Navigation minimap and modal                        |
| MODELVIEWS       | Views Window                                                |
| COACHMARKS       | All coachmarks                                              |
| COACHMARKSHIDDEN | Hidden Objects coachmark label                              |
| COACHMARKSECTION | Section Applied coachmark label                             |
| MEASUREMENT_SD   | Shortest Distance tool                                      |
| SETTINGS         | Settings Window to change unit display                      |
| CONTEXTMENU      | Right click context menu                                    |
| VIEW_PROPERTIES  | View properties of an object                                |

`MEASUREMENT_SD`

| Option      | Type    | Description                                                                                                                                         |
| ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| center_lock | Boolean | Enables or disables the measurement navigation mode. Set to false if you don't want the navigation to change in anyway after a measurement is made. |

<!-- markdownlint-enable no-inline-html -->
