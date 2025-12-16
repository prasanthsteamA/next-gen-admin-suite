import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const dashboardRouter = Router();
dashboardRouter.use(verifyToken);

dashboardRouter.get('/metrics', async (req, res) => {
  res.json({
    success: true,
    data: {
      vehiclesNeedingCharge: 0,
      vehiclesChargingNow: 0,
      vehiclesToday: 0,
      tripsAtRisk: 0,
      forecastEnergyCost: 0,
      energyCostTrend: 0,
      forecastDowntimeCost: 0,
    }
  });
});

export default dashboardRouter;
