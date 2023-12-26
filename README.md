# dash kbar

cmd + k interface for dash applications

![dash_kbar_animation](/dash_kbar_animation.gif)


## Installation

```bash
pip install dash_kbar
```

## Usage

```python
dash_kbar.DashKbar(
    id="input",
    actions=[
        {"name": "Action 1", "id": "action1"},
        {"name": "Action 2", "id": "action2"},
    ],
    style={
        "itemTextColor": "grey",
    },
)
```

Look into `usage.py` for a functioning example usage.

## API

The following properties are accepted by `DashKbar`.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `id` | The ID used to identify this component in Dash callbacks | `str` | `None` |
| `actions` | List of actions to display in the kbar | `list[dict[str, str]]` | `[]` |
| `style` | Style of the kbar | `dict[str, str]` | `{}` |
| `selected` | ID of the selected item. You can use this prop in callbacks. | `str` | `None` |
| `debug` | Show the id of the selected item in the browser console | `bool` | `False` |

### Actions

Actions should be a list of dictionaries with the following keys.

| Key | Description | Type | Required |
| --- | --- | --- | --- |
| `name` | Name of the action | `str` | Yes |
| `id` | ID of the action | `str` | Yes |
| `subtitle` | Subtitle of the action | `str` | No |
| `section` | Section of the action | `str` | No |
| `icon` | Icon of the action | `str` | No |
| `parent` | If this is a child item, give the id of the parent | `str` | No |
| `noAction` | Dont change the `selected` prop when you select this. Usually used for parent actions. | `bool` | No |
| `shortcut` | Shortcut of the action | `list[str]` | No |


## Styling

Style should be a dictionary with one or more of the following keys.

| Key | Description | Default |
| --- | --- | --- |
| `maxWidth` | Maximum width of the kbar | `600px` |
| `width` | Width of the kbar | `100%` |
| `background` | Background color of the kbar | `white` |
| `searchBackground` | Background color of the search input box | `transparent` |
| `searchTextColor` | Text color of the search input box | `grey` |
| `fontFamily` | Font family of the kbar | `sans-serif` |
| `itemTextColor` | Text color of the items | `grey` |
| `itemSubtitleTextColor` | Text color of the item subtitles | `grey` |
| `sectionTitleTextColor` | Text color of the section titles | `grey` |
| `selectedBackground` | Background color of the selected item | `rgba(34, 139, 230, 0.1)` |
| `selectedTextColor` | Text color of the selected item | `grey` |
| `selectedLeftBorderColor` | Left border color of the selected item | `rgba(34, 139, 230, 1)` |

