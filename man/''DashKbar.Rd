% Auto-generated: do not edit by hand
\name{''DashKbar}

\alias{''DashKbar}

\title{DashKbar component}

\description{

}

\usage{
''DashKbar(id=NULL, actions=NULL, resultsClassName=NULL,
searchClassName=NULL, selected=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{actions}{List of lists containing elements 'id', 'name', 'shortcut', 'keywords', 'section', 'icon', 'subtitle', 'parentid'.
those elements have the following types:
  - id (character; required)
  - name (character; required)
  - shortcut (character; optional)
  - keywords (character; optional)
  - section (character; optional)
  - icon (character; optional)
  - subtitle (character; optional)
  - parentid (character; optional)s. Actions to be registered with KBar}

\item{resultsClassName}{Character. className to be applied to the results}

\item{searchClassName}{Character. className to be applied to the search bar}

\item{selected}{Character. The currently selected action}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

