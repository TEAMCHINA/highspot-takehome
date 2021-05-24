
import { AttributeList } from "./AttributeList";

const styles = {
  cardContainer: {
    margin: "10px",
    width: "325px",
    height: "360px",
    backgroundColor: "#DDDDDD", // TODO: Consider setting background color/image based on card rarity?
    border: "1px solid #000"
  },
  cardMainContainer: {
    display: "flex",
  },
  cardImage: {
    width: "150px",
    height: "250px"
  },
  cardDetailsContainer: {
    paddingLeft: "5px",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    fontSize: "110%",
    fontWeight: "bold"
  },
  cardText: {
    marginTop: "20px",
    fontStyle: "italic",
    textAlign: "center",
    margin: "0 20px 20px 20px",
  },
}

export const Card = props => {
  var { cardData } = props;

  return (
    <div style={styles.cardContainer}>
      <div style={styles.cardMainContainer}>
        <div>
          <img
            style={styles.cardImage}
            src={cardData.imageUrl}
            alt={cardData.name} />
        </div>
        <div style={styles.cardDetailsContainer}>
          <div style={styles.cardTitle}>{cardData.name}</div>
          <div>Rarity: {cardData.rarity}</div>
          <div>Type: {cardData.type}</div>
          {!!cardData?.set?.name && (
            <div>Set: {cardData.set.name}</div>
          )}
          <div>Cost: {cardData.cost}</div>
          {cardData.power && (
            <div>Power: {cardData.power}</div>
          )}
          {cardData.health && (
            <div>Health: {cardData.health}</div>
          )}
          {cardData.attributes && (
            <div>
              Attributes:
              <AttributeList attributes={cardData.attributes} />
            </div>
          )}
        </div>
      </div>
      <div style={styles.cardText}>
        {cardData.text}
      </div>
  </div>
);
}