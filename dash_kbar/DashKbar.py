# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashKbar(Component):
    """A DashKbar component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Children to be rendered.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- actions (list of dicts; optional):
    Actions to be registered with KBar.

    `actions` is a list of dicts with keys:

    - actionable (boolean; optional)

    - icon (string; optional)

    - id (string; required)

    - keywords (list of strings; optional)

    - name (string; required)

    - parentId (string; optional)

    - section (string; optional)

    - shortcut (string | list of strings; optional)

    - subtitle (string; optional)

- debug (boolean; default False):
    Whether to print debug messages.

- selected (string; optional):
    The currently selected action.

- style (dict; optional):
    style object.

    `style` is a dict with keys:

    - background (string; optional)

    - fontFamily (string; optional)

    - maxWidth (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_kbar'
    _type = 'DashKbar'
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, debug=Component.UNDEFINED, style=Component.UNDEFINED, actions=Component.UNDEFINED, selected=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'actions', 'debug', 'selected', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'actions', 'debug', 'selected', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        super(DashKbar, self).__init__(children=children, **args)
