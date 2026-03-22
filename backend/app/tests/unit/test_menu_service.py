# import pytest
# from unittest.mock import MagicMock, patch, AsyncMock
# from app.services.menu import MenuService


# @pytest.fixture
# def service(db_session):
#     srv = MenuService(db_session)
#     srv.model = MagicMock()
#     srv.query_model = MagicMock()
#     return srv


# @pytest.mark.asyncio
# async def test_create_menu_success(service):
#     csv_content = "Name,RecipeCategory,RecipeIngredientParts\nPizza,Italian,Flour\n"
#     fake_file = AsyncMock()
#     fake_file.read.return_value = csv_content.encode("utf-8")


#     with patch("app.services.menu.embedding_model.encode") as mock_encode:
#         mock_encode.return_value = [[0.1, 0.2, 0.3]]
#         service.model.insert_menu_items.return_value = [{"id": 1}]

#         result = await service.create_menu(fake_file)

#         assert "1 recipes inserted successfully" in result["message"]
#         service.model.insert_menu_items.assert_called_once()


# def test_search_menu_logic(service):
#     with patch("app.services.menu.embedding_model.encode") as mock_encode:
#         mock_encode.return_value = [0.1, 0.1, 0.1]

#         mock_plate = MagicMock()
#         mock_plate.Name = "Pasta"
#         mock_plate.RecipeCategory = "Main"
#         mock_plate.RecipeIngredientParts = "Tomato"
#         mock_plate.Price = 12.0
#         service.model.search_by_similarity.return_value = [mock_plate]

#         results = service.search_menu("I want pasta")

#         assert len(results) == 1
#         assert results["name"] == "Pasta"


# def test_llm_generate_answer_logic(service):
#     fake_chunks = [{"name": "Burger", "category": "Fast", "ingredients": "Beef"}]

#     with patch("app.services.menu.ollama_generate") as mock_ollama:
#         mock_ollama.return_value = "This is a delicious burger."

#         answer = service.llm_generate_answer(
#             query="What is the burger?",
#             ollama_url="http://fake-url",
#             model="llama3",
#             chunks=fake_chunks,
#             user_id=1
#         )

#         assert answer == "This is a delicious burger."

#         service.query_model.insert_query.assert_called_with(
#             "What is the burger?", "This is a delicious burger.", 1
#         )
