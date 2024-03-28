from django.contrib import admin

# Register your models here.
from api.models import Syndic,Copropriete,Lot,Coproprietaire,DocumentCopro,Document

admin.site.register(Syndic)
admin.site.register(Copropriete)
admin.site.register(Lot)
admin.site.register(Coproprietaire)
admin.site.register(DocumentCopro)
admin.site.register(Document)