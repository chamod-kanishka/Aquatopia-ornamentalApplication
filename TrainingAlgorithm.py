# -----Imports-----
import pandas as pd

from Recommendation import SellerRecommendationSystem

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

# Trainig algorithm
def train_recommendation_system():
# Count of users, sellers and episodes
    num_products = len(assigned_sellers_per_product)
    num_sellers = df['seller_id'].nunique()
    num_episodes = len(df)

    # Create instance for seller recommendation system
    system = SellerRecommendationSystem(num_products, num_sellers, assigned_sellers_per_product)

    for episode in range(num_episodes):
        for product_id in range(1, num_products + 1):
            # Get recommended seller
            recommended_seller = system.recommend(product_id)
            # Get reward
            reward = system.get_reward(product_id, recommended_seller)

            if reward is not None:
                # Update the recommendation system with acquired values
                system.update(product_id, recommended_seller, reward, recommended_seller)
    
    return True        