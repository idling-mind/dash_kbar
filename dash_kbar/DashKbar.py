# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashKbar(Component):
    """A DashKbar component.


Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- actions (list of dicts; optional):
    Actions to be registered with KBar.

    `actions` is a list of dicts with keys:

    - icon (string; optional)

    - id (string; required)

    - keywords (string; optional)

    - name (string; required)

    - parentId (string; optional)

    - section (string; optional)

    - shortcut (string; optional)

    - subtitle (string; optional)

- resultsClassName (string; optional):
    className to be applied to the results.

- searchClassName (string; optional):
    className to be applied to the search bar.

- selected (string; optional):
    The currently selected action."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_kbar'
    _type = 'DashKbar'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, actions=Component.UNDEFINED, searchClassName=Component.UNDEFINED, resultsClassName=Component.UNDEFINED, selected=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'actions', 'resultsClassName', 'searchClassName', 'selected']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'actions', 'resultsClassName', 'searchClassName', 'selected']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashKbar, self).__init__(**args)
