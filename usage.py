import dash_kbar
from dash import Dash, callback, html, Input, Output, dcc, no_update, State
import dash_mantine_components as dmc

app = Dash(__name__)

app.layout = dmc.MantineProvider(
    dmc.Container(
        dmc.Stack(
            [
                dmc.Button("Click me", id="button"),
                dash_kbar.DashKbar(
                    id="input",
                    actions=[
                        {"name": "Action 1", "id": "action1", "icon": "⭐️"},
                        {"name": "Child 1", "id": "action5", "parent": "action1"},
                        {"name": "Action 2", "id": "action2", "section": "Section 1"},
                        {"name": "Action 3", "id": "action3", "section": "Section 1"},
                        {"name": "Action 4", "id": "action4", "subtitle": "this is a subtitle", "section": "Section 2"},
                    ],
                ),
                dmc.Chip(id="output"),
            ]
        )
    )
)


@callback(
    Output("input", "actions"), Input("button", "n_clicks"), State("input", "actions")
)
def update_actions(n_clicks, actions):
    if n_clicks is None:
        return no_update
    return actions + [
        {"name": f"New Action {i}", "id": f"action{i}"} for i in range(1, n_clicks + 1)
    ]


@callback(Output("output", "children"), Input("input", "selected"))
def update_output(selected):
    if selected is None:
        return "No action selected"
    return f"Action {selected} selected"


if __name__ == "__main__":
    app.run_server(debug=True)
