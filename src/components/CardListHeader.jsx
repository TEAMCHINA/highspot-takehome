const styles = {
    header: {
      position: "sticky",
      top: "0",
      left: "0",
      textAlign: "center",
      padding: "3px 10px",
      backgroundColor: "#CCCCCC",
      borderBottom: "1px solid #000",
      display: "flex",
      justifyContent: "space-between"
    },
    pageTitle: {
      fontWeight: "bold",
    },
    loadingText: {
      marginLeft: "10px",
      fontWeight: "normal"
    },
    searchNameInput: {
        width: "100px",
        marginLeft: "2px"
    }
}

export const CardListHeader = props => {
    const { loading, handleSearchNameChange, handleSearchSubmit } = props;

    return (
        <div style={styles.header}>
        <div style={styles.pageTitle}>
          Elder Scrolls Legends 
          { loading && (<span style={styles.loadingText}>[LOADING]</span> )}
        </div>
        <div>
          <form
            onSubmit={handleSearchSubmit}>
            <label for="searchNameInput">Search:</label>
            <input style={styles.searchNameInput} type="text" id="searchNameInput" onChange={handleSearchNameChange}/>
            <input type="submit" value=">"/>
          </form>
        </div>
      </div>

    );
}