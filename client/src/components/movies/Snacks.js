import React from "react";
import ComboCard from "./MovieUtilities/ComboCard"
import {movieApi} from "../../api/axios"
const Snacks = ({comboPrice, setComboPrice, selectedSnacks, setSelectedSnacks}) => {
    const [snacks, setSnacks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    React.useEffect(() => {
        const fetchSnacks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await movieApi.get("/snacks");
                console.log(response.data);
                setSnacks(response.data);
            } catch (error) {
                console.error("Failed to fetch snacks:", error);
                setError("Failed to load snack data.");
            } finally {
                setLoading(false);
            }
        };
        fetchSnacks();
    }, []);

    const updateQuantity = (itemId, itemName, price, quantity) => {
        setSelectedSnacks((prev) => {
            const updatedItems = {...prev};
            if (quantity === 0){
                delete updatedItems[itemId];
            } else {
                updatedItems[itemId] = {itemId ,itemName, price, quantity}
            }
            return updatedItems;
        });
    }

    React.useEffect(() => {
        const totalPrice = Object.values(selectedSnacks).reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        setComboPrice(totalPrice)
    }, [selectedSnacks, setComboPrice]);
    return (
        <div>
            {snacks.map((snack) => (
                <ComboCard
                    key={snack.Id}
                    Name={snack.ItemName}
                    image={snack.Image}
                    price={snack.Price}
                    onQuantityChange={(quantity) =>
                        updateQuantity(snack.Id, snack.ItemName, snack.Price, quantity)
                    }
                />
            ))}
        </div>
    );
};

export default Snacks;
