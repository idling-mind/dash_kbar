# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''DashKbar <- function(children=NULL, id=NULL, actions=NULL, debug=NULL, selected=NULL, style=NULL) {
    
    props <- list(children=children, id=id, actions=actions, debug=debug, selected=selected, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashKbar',
        namespace = 'dash_kbar',
        propNames = c('children', 'id', 'actions', 'debug', 'selected', 'style'),
        package = 'dashKbar'
        )

    structure(component, class = c('dash_component', 'list'))
}
