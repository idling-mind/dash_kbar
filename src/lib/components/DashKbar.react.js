import React, {useState} from 'react';
import {
    KBarProvider,
    KBarSearch,
    KBarResults,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    useMatches,
    createAction,
    useRegisterActions,
} from 'kbar';
import PropTypes from 'prop-types';

const DashKbar = (props) => {
    const {id, setProps, actions} = props;
    return (
        <KBarProvider id={id}>
            <div>
                <KBarPortal>
                    <KBarPositioner>
                        <KBarAnimator
                            className={props.animatorClassName}
                            style={props.animatorStyle}
                        >
                            <KBarSearch
                                className={props.searchClassName}
                                style={props.searchStyle}
                            />
                            <RenderResults
                                className={props.resultsClassName}
                                style={props.resultsStyle}
                                itemClassName={props.resultItemClassName}
                                itemStyle={props.resultItemStyle}
                            />
                            <ActionRegistration
                                actions={actions}
                                setProps={setProps}
                            />
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
            </div>
        </KBarProvider>
    );
};

function ActionRegistration(props) {
    const action_objects = props.actions.map((action) => {
        action.perform = () => {
            console.log('Selected:', action.id);
            props.setProps({selected: action.id});
        };
        return createAction(action);
    });
    useRegisterActions(action_objects);
    return null;
}

function RenderResults(props) {
    const {results, rootActionId} = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({item, active}) =>
                typeof item === 'string' ? (
                    <div
                        style={props.resultItemStyle}
                        className={props.resultItemClassName}
                    >
                        {item}
                    </div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                        style={props.resultItemStyle}
                        className={props.resultItemClassName}
                    />
                )
            }
        />
    );
}

const ResultItem = React.forwardRef(
    (
        {action, active, currentRootActionId, style, className} = {
            action,
            active,
            currentRootActionId,
            style,
            className,
        },
        ref
    ) => {
        const ancestors = React.useMemo(() => {
            if (!currentRootActionId) return action.ancestors;
            const index = action.ancestors.findIndex(
                (ancestor) => ancestor.id === currentRootActionId
            );
            // +1 removes the currentRootAction; e.g.
            // if we are on the "Set theme" parent action,
            // the UI should not display "Set theme… > Dark"
            // but rather just "Dark"
            return action.ancestors.slice(index + 1);
        }, [action.ancestors, currentRootActionId]);

        return (
            <div ref={ref} style={style}>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        fontSize: 14,
                    }}
                >
                    {action.icon && action.icon}
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <React.Fragment key={ancestor.id}>
                                        <span
                                            style={{
                                                opacity: 0.5,
                                                marginRight: 8,
                                            }}
                                        >
                                            {ancestor.name}
                                        </span>
                                        <span
                                            style={{
                                                marginRight: 8,
                                            }}
                                        >
                                            &rsaquo;
                                        </span>
                                    </React.Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && (
                            <span style={{fontSize: 12}}>
                                {action.subtitle}
                            </span>
                        )}
                    </div>
                </div>
                {action.shortcut?.length ? (
                    <div
                        aria-hidden
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gap: '4px',
                        }}
                    >
                        {action.shortcut.map((sc) => (
                            <kbd
                                key={sc}
                                style={{
                                    padding: '4px 6px',
                                    background: 'rgba(0 0 0 / .1)',
                                    borderRadius: '4px',
                                    fontSize: 14,
                                }}
                            >
                                {sc}
                            </kbd>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
);

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
     * className to be applied to the search bar
     */
    searchClassName: PropTypes.string,

    /**
     * className to be applied to the results
     */
    resultsClassName: PropTypes.string,

    /**
     * The currently selected action
     */
    selected: PropTypes.string,
};

export default DashKbar;
