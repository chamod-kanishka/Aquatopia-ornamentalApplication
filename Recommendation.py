# -----Imports-----
import numpy as np
import tensorflow as tf
import pandas as pd

# -----Loading initial dataset-----
df = pd.read_csv("./data/product_seller_rank.csv")

# -----Extract only unique combinations-----
unique_df = df.groupby(['product_id','seller_id', 'review']).size().reset_index().rename(columns={0:'count'})
print(unique_df)


# Assign sellers to product IDs
assigned_sellers_per_product = {
    1: [17, 25, 18, 12, 7, 10, 22, 16, 8, 24],
    2: [11, 18, 10, 21, 16, 2, 8, 20, 18],
    3: [25, 22, 6, 2, 12, 5, 3, 8, 22, 3],
    4: [3, 12, 19, 2, 11, 1, 22, 20, 18, 9, 6, 4],
    5: [2, 9, 17, 11, 8, 6, 14, 18, 24, 4],
    6: [11, 23, 21, 14, 20, 2, 14, 18, 16, 3, 8]
}


# Define the agent
class RecommenderAgent:
    def __init__(self, num_sellers_per_product, assigned_sellers, learning_rate=0.001, discount_factor=0.95, epsilon=1.0, epsilon_decay=0.99):
        self.num_sellers_per_product = num_sellers_per_product
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.epsilon_decay = epsilon_decay

        self.q_values = {product_id: np.zeros(len(assigned_sellers[product_id])) for product_id in range(1, len(assigned_sellers) + 1)}
        # print(self.q_values)
        self.assigned_sellers = assigned_sellers

        self.model = self.build_model()
        print(self.model);

    def build_model(self):
        # Define the neural network model
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(self.num_sellers_per_product,)),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(self.num_sellers_per_product, activation='softmax')
        ])
        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=self.learning_rate),
                      loss=tf.keras.losses.MeanSquaredError())
        return model

    # def choose_action(self, product_id):
    #     if np.random.rand() <= self.epsilon:
    #         return np.random.choice(self.assigned_sellers[product_id])
    #     return np.argmax(self.q_values[product_id])
    def choose_action(self, product_id):
        if np.random.rand() <= self.epsilon:
            random_action = np.random.choice(self.assigned_sellers[product_id])
            print("Random action:", random_action)
            return random_action
        else:
            argmax_action = np.argmax(self.q_values[product_id])
            print("Argmax action:", argmax_action)
            return argmax_action



    def update(self, product_id, seller_id, reward, next_state):
        q_value = self.q_values[product_id][self.assigned_sellers[product_id].index(seller_id)]
        next_max_q = np.max(self.q_values[product_id])

        updated_q = q_value + self.learning_rate * (reward + self.discount_factor * next_max_q - q_value)
        self.q_values[product_id][self.assigned_sellers[product_id].index(seller_id)] = updated_q

        if self.epsilon > 0.01:
            self.epsilon *= self.epsilon_decay

# Define the overall recommendation system
# States -> Users, Actions -> Sellers, Rewards -> User Reviews
class SellerRecommendationSystem:
    def __init__(self, num_products, num_sellers, assigned_sellers):
        self.num_products = num_products
        self.num_sellers = num_sellers
        self.assigned_sellers = assigned_sellers
        self.recommender_agents = {product_id: RecommenderAgent(len(assigned_sellers[product_id]), assigned_sellers) for product_id in range(1, num_products + 1)}

    def recommend(self, product_id):
        agent = self.recommender_agents[product_id]
        action = agent.choose_action(product_id)
        return action

    def update(self, product_id, seller_id, reward, next_state):
        agent = self.recommender_agents[product_id]
        # print(agent)
        # print(next_state)
        agent.update(product_id, seller_id, reward, next_state)

    def get_reward(self, product_id, recommended_seller):
        user_preference = df.loc[(df["product_id"] == product_id) & (df["seller_id"] == recommended_seller)]["review"].tolist()

        if len(user_preference) > 0:
            if user_preference[0] == "good":
                reward = 1.0
            elif user_preference[0] == "bad":
                reward = -1.0
            else:
                reward = 0.0

            return reward
