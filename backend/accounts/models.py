from django.db import models

# -------------------------
# Vessel Model
# -------------------------
class Vessel(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=50)   # e.g. "In Port", "Delayed"
    risk = models.CharField(max_length=20)     # e.g. "High", "Medium", "Low"
    eta = models.DateTimeField(null=True, blank=True)
    type = models.CharField(max_length=50)     # e.g. "Cargo", "Tanker"
    speed = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name


# -------------------------
# Port Model
# -------------------------
class Port(models.Model):
    name = models.CharField(max_length=100)
    congestion_index = models.IntegerField()   # congestion level (0–100)
    arrivals_today = models.IntegerField()     # number of arrivals today
    avg_wait_time = models.FloatField()        # average wait time in hours

    def __str__(self):
        return self.name


# -------------------------
# Company Model
# -------------------------
class Company(models.Model):
    name = models.CharField(max_length=100)
    fleet_size = models.IntegerField()         # number of vessels owned
    on_time_deliveries = models.IntegerField() # successful deliveries
    incidents = models.IntegerField()          # reported incidents

    def __str__(self):
        return self.name


# -------------------------
# Insurer Model
# -------------------------
class Insurer(models.Model):
    name = models.CharField(max_length=100)
    risk_exposure = models.FloatField()        # total risk exposure value
    claims_processed = models.IntegerField()   # number of claims handled
    compliance_score = models.FloatField()     # compliance rating (0–100)

    def __str__(self):
        return self.name
