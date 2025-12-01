const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

 router.get('/', (_, response) =>{
     const summaries = recipes.map(recipe =>{
         const {id, title, image, prepTime, difficulty} = recipe
         return {id, title, image, prepTime, difficulty}
     })
     response.send(summaries)
 })

//get elements from all the recipes
 router.get('/api/v1/', (_, response) =>{
    const summaries = recipes.map(recipe =>{
        const {id, title, image, prepTime, difficulty} = recipe
        return {id, title, image, prepTime, difficulty}
    })
    response.send(summaries)
})

//get full recipe with a matching id
router.get('/api/v1/recipes/:id', (request, response) =>{

    const {id} = request.params

    const found = recipes.find(recipe =>{
        return recipe.id.toString() === id
    })

    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find recipe with id '+{id}})
})

//add recipe to the array

router.post('/api/v1/recipe/add', (request, response) =>{

    const id=recipes.length+1 //new id
    const recipe = request.body
    const newRecipe = {id, ...recipe}//new id with the contents of the recipe
    recipes.push(newRecipe)//push the new recipe
    response.send(newRecipe)
})

//return the routes
module.exports = router
