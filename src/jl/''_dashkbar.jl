# AUTO GENERATED FILE - DO NOT EDIT

export ''_dashkbar

"""
    ''_dashkbar(;kwargs...)

A DashKbar component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `actions` (optional): Actions to be registered with KBar. actions has the following type: Array of lists containing elements 'id', 'name', 'shortcut', 'keywords', 'section', 'icon', 'subtitle', 'parentId', 'noAction'.
Those elements have the following types:
  - `id` (String; required)
  - `name` (String; required)
  - `shortcut` (String; optional)
  - `keywords` (String; optional)
  - `section` (String; optional)
  - `icon` (String; optional)
  - `subtitle` (String; optional)
  - `parentId` (String; optional)
  - `noAction` (Bool; optional)s
- `debug` (Bool; optional): Whether to print debug messages
- `selected` (String; optional): The currently selected action
- `style` (optional): style object. style has the following type: lists containing elements 'maxWidth', 'background', 'fontFamily'.
Those elements have the following types:
  - `maxWidth` (String; optional)
  - `background` (String; optional)
  - `fontFamily` (String; optional)
"""
function ''_dashkbar(; kwargs...)
        available_props = Symbol[:id, :actions, :debug, :selected, :style]
        wild_props = Symbol[]
        return Component("''_dashkbar", "DashKbar", "dash_kbar", available_props, wild_props; kwargs...)
end

