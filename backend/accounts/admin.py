from django.contrib import admin
from .models import Vessel, Port, Company, Insurer

# Register each model so it appears in Django Admin
@admin.register(Vessel)
class VesselAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "risk", "eta", "type", "speed")
    search_fields = ("name", "status", "risk", "type")

@admin.register(Port)
class PortAdmin(admin.ModelAdmin):
    list_display = ("name", "congestion_index", "arrivals_today", "avg_wait_time")
    search_fields = ("name",)

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "fleet_size", "on_time_deliveries", "incidents")
    search_fields = ("name",)

@admin.register(Insurer)
class InsurerAdmin(admin.ModelAdmin):
    list_display = ("name", "risk_exposure", "claims_processed", "compliance_score")
    search_fields = ("name",)
