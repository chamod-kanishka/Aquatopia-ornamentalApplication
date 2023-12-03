import json
from Recommendation import SellerRecommendationSystem

# Assign sellers to product IDs
assigned_sellers_per_product = {
    1: [17, 25, 18, 12, 7, 10, 22, 16, 8, 24],
    2: [11, 18, 10, 21, 16, 2, 8, 20, 18],
    3: [25, 22, 6, 2, 12, 5, 3, 8, 22, 3],
    4: [3, 12, 19, 2, 11, 1, 22, 20, 18, 9, 6, 4],
    5: [2, 9, 17, 11, 8, 6, 14, 18, 24, 4],
    6: [11, 23, 21, 14, 20, 2, 14, 18, 16, 3, 8]
}

# Number of products and sellers
num_products = len(assigned_sellers_per_product)
num_sellers = max(seller for sellers in assigned_sellers_per_product.values() for seller in sellers)

# -----Get recommendation-----
def get_recommendation(num_products, num_sellers, product_id_new):
    # Create new instance for seller recommendation system
    seller_recommendation_system = SellerRecommendationSystem(num_products, num_sellers, assigned_sellers_per_product)

    # Get recommended seller
    recommended_seller = int(seller_recommendation_system.recommend(product_id_new))

    # Convert the result to a JSON serializable format (e.g., a dictionary)
    result = {"recommended_seller": recommended_seller}

    # Convert the result to JSON
    json_result = json.dumps(result)
    
    return json_result



# -----Update recommendation system-----
def update_recommendation_system(num_products, num_sellers, product_id, recommended_seller, reward):
    # Create new instance for seller recommendation system
    system_new = SellerRecommendationSystem(int(num_products), int(num_sellers),assigned_sellers_per_product)

    # Update the recommendation system with aquired values
    system_new.update(int(product_id), int(recommended_seller), float(reward), int(reward))
    
    return True