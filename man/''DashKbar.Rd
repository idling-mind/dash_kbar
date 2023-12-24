% Auto-generated: do not edit by hand
\name{''DashKbar}

\alias{''DashKbar}

\title{DashKbar component}

\description{

}

\usage{
''DashKbar(id=NULL, actions=NULL, debug=NULL, selected=NULL, style=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{actions}{List of lists containing elements 'id', 'name', 'shortcut', 'keywords', 'section', 'icon', 'subtitle', 'parentid', 'noaction'.
those elements have the following types:
  - id (character; required)
  - name (character; required)
  - shortcut (character; optional)
  - keywords (character; optional)
  - section (character; optional)
  - icon (character; optional)
  - subtitle (character; optional)
  - parentid (character; optional)
  - noaction (logical; optional)s. Actions to be registered with KBar}

\item{debug}{Logical. Whether to print debug messages}

\item{selected}{Character. The currently selected action}

\item{style}{Lists containing elements 'maxwidth', 'background', 'fontfamily'.
those elements have the following types:
  - maxwidth (character; optional)
  - background (character; optional)
  - fontfamily (character; optional). style object}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

