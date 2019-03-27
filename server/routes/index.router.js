const express = require('express')
const router = express.Router()

const crtlUser = require('../controllers/user.controller')
const crtlDevice = require('../controllers/device.controller')
const crtlTech = require('../controllers/technician.controller')
const jwtHelper = require('../config/jwtHelper')

router.post('/register', crtlUser.register)
router.post('/authenticate', crtlUser.authenticate)
router.get('/userProfile', jwtHelper.verifyJwtToken ,crtlUser.userProfile)
router.post('/logout', crtlUser.logout)

router.post('/createDevice', crtlDevice.create)
router.get('/getDevice/:id', crtlDevice.get)
router.get('/getAllDevice', crtlDevice.getAll)
router.get('/getDeviceTechnician/:id', crtlDevice.getDevTech)
router.delete('/deleteDevice/:id', crtlDevice.delete)
router.put('/updateDevice/:id', crtlDevice.update)
router.get('/getAllNotDeviceTechnician/:id', crtlDevice.getAllNotDevTech)

router.post('/createTech', crtlTech.create)
router.get('/getTechnician/:id', crtlTech.get)
router.get('/getAllTechnician', crtlTech.getAll)
router.get('/getTechnicianDevices/:id', crtlTech.getTechDev)
router.put('/updateTechnician/:id', crtlTech.update)
router.delete('/deleteTech/:id', crtlTech.delete)

const ctrlDevTech = require('../controllers/deviceTechnician.controller')
router.post('/createDevTech', ctrlDevTech.create)


module.exports = router