import axios from 'axios';


// Recipes

export function getRecipes(params) {
  return axios.get('/api/recipes/', { params })
}

export function getRecipe(id) {
  return axios.get(`/api/recipes/${id}/`)
}

export function createRecipe(data) {
  return axios.post(`/api/recipes/`, data)
}

export function updateRecipe(id, data) {
  return axios.put(`/api/recipes/${id}/`, data)
}

export function deleteRecipe(id) {
  return axios.delete(`/api/recipes/${id}/`)
}

// Categories

export function getCategories() {
  return axios.get('/api/categories/')
}

export function getCategory(id) {
  return axios.get(`/api/categories/${id}/`)
}

export function createCategory(data) {
  return axios.post('/api/categories/', data)
}

export function updateCategory(id, data) {
  return axios.put(`/api/categories/${id}/`, data)
}

export function deleteCategory(id) {
  return axios.delete(`/api/categories/${id}/`)
}

// Cuisines

export function getCuisines() {
  return axios.get('/api/cuisines/')
}

export function getCuisine(id) {
  return axios.get(`/api/cuisines/${id}/`)
}

export function createCuisine(data) {
  return axios.post('/api/cuisines/', data)
}

export function updateCuisine(id, data) {
  return axios.put(`/api/cuisines/${id}/`, data)
}

export function deleteCuisine(id) {
  return axios.delete(`/api/cuisines/${id}/`)
}

// Ingredients

export function getIngredients() {
  return axios.get('/api/ingredients/')
}

export function getIngredient(id) {
  return axios.get(`/api/ingredients/${id}/`)
}

export function createIngredient(data) {
  return axios.post('/api/ingredients/', data)
}

export function updateIngredient(id, data) {
  return axios.put(`/api/ingredients/${id}/`, data)
}

export function deleteIngredient(id) {
  return axios.delete(`/api/ingredients/${id}/`)
}
