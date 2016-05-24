import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

const SearchableList = (ItemComponent) => {
    class ComposedSearchableList extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            const { itemMap, refresh } = this.props;
            if (itemMap.shouldUpdate()) {
                refresh();
            }
        }


        render() {
            const { id, itemMap, refresh } = this.props;

            const children = [];

            for (const [itemName, itemData] of itemMap.byName) {
                children.push(
                    <li key={itemName}>
                        <ItemComponent
                            name={itemName}
                            data={itemData}
                        />
                    </li>
                );
            }

            const onClick = (event) => {
                event.preventDefault();
                refresh();
            };

            return (
                <div id={id}>
                    <div id={`${id}-header`}>
                        <div>
                            <button onClick={onClick}>
                                Refresh
                            </button>
                        </div>
                    </div>
                    <ul>
                        {children}
                    </ul>
                </div>
            );
        }
    }

    ComposedSearchableList.propTypes = {
        id:      PropTypes.string.isRequired,
        itemMap: ImmutablePropTypes.record.isRequired,
        refresh: PropTypes.func.isRequired
    };

    return ComposedSearchableList;
};

export default SearchableList;
