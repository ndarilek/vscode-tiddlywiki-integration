# TiddlyWiki integration for VS Code

Ever wanted to use TiddlyWiki to manage projects right from VS Code? Now you can.

## Features

* Loads wikis from configurable paths relative to the workspace root.
* Saves wikis using saver support built into the extension.
* If a wiki is not found at the default location, automatically copy in an empty one from the extension.
* Focus the wiki via keyboard shortcut, ctrl+alt+w or cmd+alt+w by default.

## Usage

This extension uses a custom saver. If the extension creates the wiki then it is installed by default, but if you're using your own wiki then you'll need to import [this tiddler](https://raw.githubusercontent.com/ndarilek/vscode-tiddlywiki-integration/main/src/saver.js.tid) to save from the extension.

Also, note that this saver has a high priority. The assumption is that editing a wiki in VS Code is a very explicit action, and if you save while doing that then you likely want that saver to be authoritative.

## Extension Settings

This extension contributes the following settings:

* `tiddlywiki-integration.path`: path relative to workspace root where wiki is located

## Known Issues

* This isn't published to the VS Code Marketplace for now. Coming soon.

## Release Notes

### 0.0.3+5.1.22

* Move view out of the activity bar to (hopefully) use more space by default.

### 0.0.2+5.1.22

* Persist WebView to preserve content when hidden.

### 0.0.1+5.1.22

* Initial release.