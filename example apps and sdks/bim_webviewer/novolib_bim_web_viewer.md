---
permalink: /novolib-bim-web-viewer
title: 'Novorender BIM Web Viewer API (Experimental)'
layout: default
section_title: Example Apps & SDKs
---

<!-- markdownlint-disable no-inline-html -->

## Getting started

<p class="heading-link-container"><a class="heading-link" href="#getting-started"></a></p>

### Installation from NPM (recommended)

<p class="heading-link-container"><a class="heading-link" href="#installation-from-npm-recommended"></a></p>

![npm version](https://img.shields.io/npm/v/@procore/novolib-pilot?color=%23f47e42)

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

| Namespace | Description                                                             |
|-----------|-------------------------------------------------------------------------|
| <_none_>  | **Core functions** of the SDK, not related to a particular namespace    |
| model     | Webviewer model data retrieval and manipulation [Model Namespace](#model-namespace)  |
| camera    | Webviewer camera retrieval and manipulation [Camera Namespace](#camera-namespace)     |
| gui       | Webviewer GUI manipulation [GUI Namespace](#gui-namespace)                         |

---

## The Core Functions

### <u>`Webviewer(container: HTMLElement, initOptions?: InitOptions)`</u>
Creates a new WebViewer instance and attaches it to the specified container element.

This constructor initializes the WebViewer with the provided options, sets up the rendering root, and patches the Mirage fetch if needed. The `initOptions` parameter allows you to specify authentication, scene ID, and beta feature flags.

**Parameters:**
- `container: HTMLElement` — The DOM element to mount the WebViewer into.
- `initOptions?: InitOptions` — Optional configuration for authentication, scene ID, and beta features.

**Example:**
```typescript
const container = document.getElementById("webviewer-container");
const webviewer = new Webviewer(container, { auth, sceneId, enableBetaFeatures });
```

**Throws:** None

---

### `start()`
Initializes and starts the WebViewer instance.

This function must be called before interacting with the viewer or any of its namespaces. It sets up all necessary resources and event listeners required for the viewer to function.

**Returns:** `void`

**Example:**
```typescript
const container = document.createElement("div");
container.style.width = "100vw";
container.style.height = "100vh";
document.body.appendChild(container);
const webviewer = new Webviewer(container);
webviewer.start();
```

**Throws:**
- None

---

### `terminate()`
Terminates the WebViewer instance and releases all resources.

This function should be called when the viewer is no longer needed, such as when navigating away from the page or destroying the component. It ensures that all event listeners and resources are properly cleaned up to prevent memory leaks.

**Returns:** `void`

**Example:**
```typescript
webviewer.terminate();
```

**Throws:**
- None


---

## The `model` Namespace

### `getSelectedObjects()`
Returns the IDs of the objects that are currently selected in the scene.

It checks the state of the selection and returns the array of IDs if available. If no objects are selected, it returns an empty array.

**Returns:** `ObjectId[]` — An array containing the IDs of the selected objects, or an empty array if none are selected.

**Example:**
```typescript
const selectedObjects = webviewer.model.getSelectedObjects();
console.log(selectedObjects); // Logs the IDs of the selected objects.
```

**Throws:** None

---

### `setXRayMode()`
Changes the visibility of all objects to X-Ray mode, allowing for a transparent view of the objects in the scene.

This is particularly useful for inspecting objects that others may obscure or for visualizing the internal structure of complex objects.

**Returns:** `void`

**Example:**
```typescript
webviewer.model.setXRayMode();
```

**Throws:** None — Will log a warning if the rendering mode is not set correctly.

---

### `setNormalMode()`
Resets the visibility of all objects in the scene to their normal state.

It is particularly useful when you want to clear any special rendering effects applied to objects and return to the default view of the scene. It ensures that all objects are rendered with their standard appearance, without any transparency or special effects that may have been applied in other modes like X-Ray.

This function is typically used in scenarios where you want to switch back to a normal view after inspecting objects in a different rendering mode, such as X-Ray mode. It helps maintain a clear and standard view of the scene, making it easier to interact with the objects and understand their relationships in the 3D space.

**Returns:** `void`

**Example:**
```typescript
// Set the scene to normal mode
webviewer.model.setNormalMode();
```

**Throws:** None — Will log a warning if the rendering mode is not set correctly.

---

### `setObjectColor(paletteParams)`
Sets the color override for the specified object IDs, based on palettes provided.

This function allows you to set custom colors for objects in the scene, which can be used for highlighting, categorization, or other visual distinctions. The `paletteParams` parameter should be an array of objects, each containing a palette and an array of object IDs. Each palette object can contain properties for default, x—ray, and selected colors, each with a color, and opacity.

**Parameters:**
- `paletteParams: PaletteParams[]` — An array of objects containing color and object IDs.

The `PaletteParams` type has two attributes:
- `palette: Palette` — An object containing color definitions.
- `objectIds: ObjectId[]` — An array of object IDs to apply the color to.

The `Palette` type has the following properties:
- `default?: Color` — The default color for the objects.
- `xray?: Color` — The color for the objects in X-Ray mode.
- `selected?: Color` — The color for the objects when selected.

The `Color` type has the following properties:
- `color: string` — A hex color string that starts with `#`, followed by exactly 6 (six) hexadecimal digits (e.g., "#FF0000").
- `opacity: number` — A number between 0 and 1 representing the opacity of the color, with 0 being fully transparent and 1 being completely opaque.

**Returns:** `void`

**Example:**
```typescript
const paletteParams = [{
    palette: {
        default: {color: "#FF0000", opacity: 0.75 },
        xray: { color: "#00FF00", opacity: 1 },
        selected: { color: "#0000FF", opacity: 1 }
    },
    objectIds: [1, 2, 3]
}];
webviewer.model.setObjectColor(paletteParams);
```

**Throws:**
- Error — If a palette contains an unknown key.
- Error — If a palette's color hex string is malformed.
- Error — If a palette's opacity is not in the proper range [0, 1].

---

### `clearObjectColor(objectIds)`
Clears the color override for the specified object IDs.

This function allows you to remove any custom color overrides that have been applied to objects in the scene. It is useful when you want to revert objects to their default appearance or when you want to clear any temporary color changes made for highlighting or categorization purposes. The function takes an array of object IDs for which the color override should be cleared. It will remove the color overrides for those objects, allowing them to be rendered with their default colors or styles as defined in the scene configuration.

**Parameters:**
- `objectIds: ObjectId[]` — An array of object IDs for which to clear the color override.

**Returns:** `void`

**Example:**
```typescript
const objectIds = [1, 2, 3];
webviewer.model.clearObjectColor(objectIds);
```

**Throws:** None

---

### `clearAllObjectColor()`
Clears all color overrides for all objects in the scene.

This function is useful when you want to reset the visual appearance of all objects. It removes any custom color overrides that have been applied to objects, allowing them to revert to their default rendering state. This is particularly useful in scenarios where you want to start fresh with the scene's visual representation, such as when switching between different rendering modes or when clearing temporary visual effects.

**Returns:** `void`

**Example:**
```typescript
webviewer.model.clearAllObjectColor();
```

**Throws:** None

---

## The `camera` Namespace

### `zoomToObjects(objectIds)`

This function calculates the bounding sphere of the objects and sets the camera to zoom to that sphere.

**Parameters:**
- `objectIds: ObjectId[]` — An array of object IDs to zoom to.

**Returns:** `Promise<void>`

**Example:**
```typescript
const objectIds = [1, 2, 3];
await webviewer.camera.zoomToObjects(objectIds);
```

**Throws:**
- Error — If the explorer globals or abort controller is not initialized.
- Error — If the bounding sphere enclosing all the objects specified by ID could not be calculated.

---

### `navToHomeView()`
Resets the camera to the initial view.

This function sets the camera to the initial position and rotation defined in the explorer globals. It is typically used to return the camera to a default view after navigating or interacting with the scene. The function uses the `resetView` function defined in the explorer globals to perform the reset. It is important to ensure that the `resetView` function is properly initialized before calling this method. If the `resetView` function is not available, it will throw an error.

**Returns:** `Promise<void>`

**Example:**
```typescript
await webviewer.camera.navToHomeView();
```

**Throws:**
- Error - If the `resetView` function is not initialized.

---

## The `gui` Namespace

### `addContextMenuItem({ label, id, onClick })`

This function allows you to add custom context menu items.

**Parameters:**
- `label: string` — The label for the context menu item.
- `id: string` — A unique ID for the context menu item.
- `onClick: () => void` — A callback function to be executed when the context menu item is clicked.

**Returns:** `void`

**Example:**
```typescript
webviewer.gui.addContextMenuItem({
    label: "Custom Action",
    id: "custom-action",
    onClick: () => {
        console.log("Custom action clicked");
    },
});
```

**Throws:**
- Error — If the viewer is not parameterized correctly
- Error — If the viewer is not fully initialized yet

---

### `removeContextMenuItems({ contextMenuItemIds })`
Removes context menu items from the Procore UX flavor.

This function allows you to remove custom context menu items in the Procore UX flavor.

**Parameters:**
- `contextMenuItemIds: string[]` — An array of the context menu item IDs to be removed.

**Returns:** `void`

**Example:**
```typescript
webviewer.gui.removeContextMenuItems({ contextMenuItemIds: ["custom-action"] });
```

**Throws:**
- Error — If the viewer is not parameterized correctly
- Error — If the viewer is not fully initialized yet

---
