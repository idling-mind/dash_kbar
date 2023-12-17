# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''DashKbar <- function(id=NULL, actions=NULL, selected=NULL) {
    
    props <- list(id=id, actions=actions, selected=selected)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashKbar',
        namespace = 'dash_kbar',
        propNames = c('id', 'actions', 'selected'),
        package = 'dashKbar'
        )

    structure(component, class = c('dash_component', 'list'))
}
