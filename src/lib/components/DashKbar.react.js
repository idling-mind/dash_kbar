import React, { useState } from 'react';
import {
    KBarProvider,
    KBarSearch,
    KBarResults,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    useMatches,
    createAction,
    useRegisterActions
} from 'kbar';
import PropTypes from 'prop-types';

const DashKbar = (props) => {
    const { id, setProps, actions } = props;
    return (
        <KBarProvider>
            <div>
                <KBarPortal>
                    <KBarPositioner>
                        <KBarAnimator>
                            <KBarSearch />
                            <RenderResults />
                            <ActionRegistration actions={actions} setProps={setProps} />
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
            </div>
        </KBarProvider>
    );
}

function ActionRegistration(props) {
    const action_objects = props.actions.map((action) => {
        action.perform = () => {
            console.log("Selected:", action.id);
            props.setProps({ selected: action.id });
        };
        return createAction(action);
    });
    useRegisterActions(action_objects);
    return null;
}

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === "string" ? (
                    <div>{item}</div>
                ) : (
                    <div>
                        {item.name}
                    </div>
                )
            }
        />
    );
}

DashKbar.defaultProps = {};

DashKbar.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * Actions to be registered with KBar
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            shortcut: PropTypes.string,
            keywords: PropTypes.string,
            section: PropTypes.string,
            icon: PropTypes.string,
            subtitle: PropTypes.string,
            parentId: PropTypes.string,
        })
    ),

    /**
     * The currently selected action
     */
    selected: PropTypes.string,
};

export default DashKbar;
