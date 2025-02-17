'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome');

Route.group(() => {
    Route.get('call/:methods/:contract', 'SmartcontractController.MethodCall')

    Route.post('send/:contract', 'SmartcontractController.MethodSend')

    Route.get('deploy', 'SmartcontractController.MethodDeploy')
}).prefix('api/vhsmart/v1')

Route.group(() => {
    Route.get('call/:methods/:contract', 'HadicController.MethodCall')

    Route.post('send/:contract', 'HadicController.MethodSend')

    Route.get('deploy', 'HadicController.MethodDeploy')
}).prefix('api/hadic/v1')

Route.group(() => {
    Route.get('getblock/:blockHash', 'BlockController.getBlock')

    Route.get('gettransaction/:txid', 'BlockController.getTransaction')
}).prefix('api/block/v1')
Route.any('*', ({ response }) => {
    response.json({ error: "Invalid URL, Please check url!!!" })
})