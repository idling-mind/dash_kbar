import React, {useState, useEffect} from 'react';
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
    const {id, setProps, actions, children, debug, style} = props;
    const [mergedStyle, setMergedStyle] = useState({});

    const defaultStyle = {
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        searchBackground: 'transparent',
        searchTextColor: 'grey',
        fontFamily: 'sans-serif',
        itemTextColor: 'grey',
        itemSubtitleTextColor: 'grey',
        sectionTitleTextColor: 'grey',
        selectedBackground: 'rgba(34, 139, 230, 0.1)',
        selectedTextColor: 'grey',
        selectedLeftBorderColor: 'rgba(34, 139, 230, 1)',
    };

    useEffect(() => {
        setMergedStyle({...defaultStyle, ...style});
    }, [style]);

    return (
        <KBarProvider id={id} options={{disableScrollbarManagement: true}}>
            <KBarPortal>
                <KBarPositioner>
                    <KBarAnimator
                        style={{
                            maxWidth: mergedStyle.maxWidth,
                            width: mergedStyle.width,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                            background: mergedStyle.background,
                            color: 'grey',
                            fontFamily: mergedStyle.fontFamily,
                        }}
                    >
                        <KBarSearch
                            style={{
                                padding: '12px 16px',
                                fontSize: '16px',
                                width: '100%',
                                boxSizing: 'border-box',
                                outline: 'none',
                                border: 'none',
                                background: mergedStyle.searchBackground,
                                color: mergedStyle.searchTextColor,
                            }}
                        />
                        <RenderResults {...props} mergedStyle={mergedStyle} />
                        <ActionRegistration
                            actions={actions}
                            setProps={setProps}
                            debug={debug}
                        />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
};

function ActionRegistration(props) {
    const action_objects = props.actions.map((action) => {
        if (action.noAction) return createAction(action);
        action.perform = () => {
            if (props.debug) {
                console.log('Performing action', action);
            }
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
                        style={{
                            padding: '8px 16px',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            color: props.mergedStyle.sectionTitleTextColor,
                        }}
                    >
                        {item}
                    </div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                        props={props}
                    />
                )
            }
        />
    );
}

const ResultItem = React.forwardRef(
    (
        {action, active, currentRootActionId, props} = {
            action,
            active,
            currentRootActionId,
            props,
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
            <div
                ref={ref}
                style={{
                    padding: '12px 16px',
                    background: active
                        ? props.mergedStyle.selectedBackground
                        : 'transparent',
                    borderLeft: `5px solid ${
                        active
                            ? props.mergedStyle.selectedLeftBorderColor
                            : 'transparent'
                    }`,
                    color: active
                        ? props.mergedStyle.selectedTextColor
                        : props.mergedStyle.itemTextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
            >
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
                            <span
                                style={{
                                    fontSize: 12,
                                    color: props.mergedStyle
                                        .itemSubtitleTextColor,
                                }}
                            >
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

DashKbar.defaultProps = {
    debug: false,
};

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
     * Children to be rendered
     */
    children: PropTypes.node,

    /**
     * Whether to print debug messages
     * */
    debug: PropTypes.bool,

    /**
     * style object
     * */
    style: PropTypes.shape({
        maxWidth: PropTypes.string,
        background: PropTypes.string,
        fontFamily: PropTypes.string,
    }),

    /**
     * Actions to be registered with KBar
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            shortcut: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string),
            ]),
            keywords: PropTypes.string,
            section: PropTypes.string,
            icon: PropTypes.string,
            subtitle: PropTypes.string,
            parentId: PropTypes.string,
            noAction: PropTypes.bool,
        })
    ),

    /**
     * The currently selected action
     */
    selected: PropTypes.string,
};

export default DashKbar;
