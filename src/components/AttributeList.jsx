const styles = {
    attributeContainer: {
        display: "flex",
        flexWrap: "wrap"
    },
    attribute: {
        backgroundColor: "#AAAAAA",
        borderRadius: "12px",
        padding: "2px 10px",
        fontSize: "14px",
        marginLeft: "8px"
    },
}

export const AttributeList = props => {
    const { attributes } = props;

    return (
        <div style={styles.attributeContainer}>
            {attributes.map(attribute => (
                <div style={styles.attribute} key={attribute}>
                    {attribute}
                </div>
            ))}
        </div>
    )
}