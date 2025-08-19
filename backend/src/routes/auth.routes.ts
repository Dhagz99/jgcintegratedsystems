import { Router } from 'express'
import { register, login, me, logout, listUsers } from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware' // 👈 import middleware
import { addBranch, addChecker, addRequestType, deleteBranch, deleteChecker, fetchBranches, fetchChecker, fetchListRequestTypes, updateBranch, updateChecker } from '../controllers/request.controller'
import { addFundTransfer, getRequestsForApprover } from '../controllers/form.controller'

const router = Router()
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);
router.post('/logout', authenticate, logout);

//User Route
router.get('/users', listUsers);


// Request Router 
router.post('/request/add-checker', authenticate, addChecker)
router.get('/request/fetch-checker', authenticate, fetchChecker)
router.delete('/request/checker/:id', authenticate, deleteChecker);
router.put("/request/checker/:id",authenticate,  updateChecker); 

//Branch Router
router.post('/request/add-branch',authenticate, addBranch)
router.get('/request/fetch-branch', authenticate, fetchBranches)
router.put("/request/update-branch/:id",authenticate,  updateBranch); 
router.delete("/request/delete-branch/:id",authenticate,  deleteBranch); 

//Request type
router.post('/request/add-request-type/', authenticate, addRequestType);
router.get('/request/list-request-type/', authenticate, fetchListRequestTypes)


//Form 
router.post('/request/add-fund-transfer/', authenticate, addFundTransfer);
router.get('/request/get-requests-approver/', authenticate, getRequestsForApprover);


export default router
