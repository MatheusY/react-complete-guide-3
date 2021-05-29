import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchMeals } = httpData;

  useEffect(() => {
    const transformMeal = (mealObj) => {
      const loadedMeals = [];

      for (const key in mealObj) {
        loadedMeals.push({
          id: key,
          name: mealObj[key].name,
          description: mealObj[key].description,
          price: mealObj[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "https://react-http-c01a6-default-rtdb.firebaseio.com/meals.json",
      },
      transformMeal
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <li>
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));

  let content = (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );

  if (isLoading) {
    content = <h2 className={classes["meals-message"]}>Loading ...</h2>;
  }

  if (error) {
    content = <h2 className={classes["meals-message"]}>Something went wrong!</h2>;
  }

  return content;
};

export default AvailableMeals;
