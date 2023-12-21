import boto3
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# Access environment variables
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")

def initialize_dynamodb_client():
    # Initialize DynamoDB client using environment variables
    dynamodb = boto3.client(
        'dynamodb',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_DEFAULT_REGION
    )
    return dynamodb

def list_tables():
    # Initialize DynamoDB client
    dynamodb = initialize_dynamodb_client()

    # List DynamoDB tables
    response = dynamodb.list_tables()
    return response['TableNames']

# ... (previous code remains unchanged)

def create_task(task_id, task_name, task_description):
    dynamodb = initialize_dynamodb_client()
    table_name = "tasks"

    try:
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                'task-id': {'S': task_id},
                'task_name': {'S': task_name},
                'task_description': {'S': task_description}
                # Add other attributes as needed based on your schema
            }
        )
        return response
    except dynamodb.exceptions.ClientError as e:
        # Handle any potential errors, log them, and potentially return a specific error message
        print(f"Error creating task: {e}")
        return {"error": "Failed to create task"}
    

# Entry point of the script remains unchanged
# ... (previous code remains unchanged)

def get_task_by_task_id(task_id):
    # Initialize DynamoDB client
    dynamodb = initialize_dynamodb_client()

    # Define your DynamoDB table name for tasks
    table_name = "tasks"  # Replace with your actual table name

    # Get task by task_id from DynamoDB
    response = dynamodb.get_item(
        TableName=table_name,
        Key={
            'task-id': {'S': task_id}
        }
    )
    return response.get('Item', {})  # Return the task item or an empty dict if not found



# ... (previous code remains unchanged)

def update_task(task_id, updated_name, updated_description):
    # Initialize DynamoDB client
    dynamodb = initialize_dynamodb_client()

    # Define your DynamoDB table name for tasks
    table_name = "tasks"  # Replace with your actual table name

    # Update task details in DynamoDB
    response = dynamodb.update_item(
        TableName=table_name,
        Key={'task-id': {'S': task_id}},
        UpdateExpression='SET task_name = :name, task_description = :desc',
        ExpressionAttributeValues={
            ':name': {'S': updated_name},
            ':desc': {'S': updated_description}
        },
        ReturnValues='UPDATED_NEW'
    )
    return response

def delete_task(task_id):

    # Initialize DynamoDB client
    dynamodb = initialize_dynamodb_client()

    # Define your DynamoDB table name for tasks
    table_name = "tasks"

    # Delete the task from DynamoDB
    response = dynamodb.delete_item(
        TableName=table_name,
        Key={
            'task-id': {'S':task_id}
        }
    )

    # Check if the deletion was successful
    if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
        return True
    else:
        return False


# Entry point of the script
if __name__ == "__main__":
    tables = list_tables()
    print("List of DynamoDB tables:", tables)
