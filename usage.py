import dash_kbar
from dash import Dash, callback, html, Input, Output, dcc, no_update

app = Dash(__name__)

app.layout = html.Div([
    html.Button('Click me', id='button'),
    dash_kbar.DashKbar(
        id='input',
        actions=[
            {'name': 'Action 1', 'id': 'action1'},
            {'name': 'Action 2', 'id': 'action2'},
            {'name': 'Action 3', 'id': 'action3'},
        ],
    ),
    html.Div(id='output')
])

@callback(Output('input', 'actions'), Input('button', 'n_clicks'))
def update_actions(n_clicks):
    if n_clicks is None:
        return no_update
    return [
        {'name': f'New Action {i}', 'id': f'action{i}'}
        for i in range(1, n_clicks + 1)
    ]

@callback(Output('output', 'children'), Input('input', 'selected'))
def update_output(selected):
    if selected is None:
        return 'No action selected'
    return f'Action {selected} selected'

if __name__ == '__main__':
    app.run_server(debug=True)
