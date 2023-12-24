import dash_kbar
from dash import Dash, callback, html, Input, Output, no_update, State

app = Dash(__name__)

app.layout = html.Div(
    [
        dash_kbar.DashKbar(
            id="input",
            actions=[
                {
                    "name": "DashKbar Theme",
                    "id": "theme_parent",
                    "icon": "⭐️",
                    "noAction": True,
                },
                {"name": "Dark", "id": "theme_dark", "parent": "theme_parent", "icon": "🌙", "shortcut": ["t", "d"]},
                {"name": "Light", "id": "theme_light", "parent": "theme_parent", "icon": "☀️", "shortcut": ["t", "l"]},
                {"name": "Action 1", "id": "action1", "section": "Section 1", "shortcut": ["a", "1"]},
                {"name": "Action 2", "id": "action2", "section": "Section 1", "shortcut": ["a", "2"]},
                {"name": "Action 3", "id": "action3", "section": "Section 1", "shortcut": ["a", "3"]},
                {
                    "name": "Action 4",
                    "id": "action4",
                    "subtitle": "this is a subtitle",
                    "section": "Section 2",
                },
            ],
            debug=True,
            style={
                "itemSubtitleTextColor": "steelblue",
                # This will be replaced if style is updated by callback
                # So use State("input", "style") as an input to the callback
                # and update the dict
            },
            children=[
                html.Button("Add action", id="button"),
                html.Div(id="output"),
            ]
        ),
    ]
)


@callback(
    Output("input", "actions"), Input("button", "n_clicks"), State("input", "actions")
)
def update_actions(n_clicks, actions):
    if n_clicks is None:
        return no_update
    return actions + [
        {"name": f"New Action {n_clicks}", "id": f"new_action_{n_clicks}"}
    ]


@callback(
    Output("output", "children"), Output("input", "style"), Input("input", "selected")
)
def update_output(selected):
    if selected is None:
        return "No action selected", no_update
    if selected == "theme_dark":
        return no_update, {"background": "#121212"}
    elif selected == "theme_light":
        return no_update, {"background": "#ffffff"}
    return f"Action {selected} selected", no_update


if __name__ == "__main__":
    app.run_server(debug=True)
