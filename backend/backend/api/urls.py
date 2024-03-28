# from django.urls import path
# from .views import StudentDetailView, StudentListCreateView

# urlpatterns = [
#     path('students/', StudentListCreateView.as_view(),
#     name="student-list-create"),
#     path('students/<int:pk>/', StudentDetailView.as_view(),
#     name="student-detail"),
# ]

from django.urls import path, include
from rest_framework import routers
from api.views import SyndicViewSet, CoproprieteViewSet, LotViewSet, CoproprietaireViewSet, DocumentCoproViewSet, DocumentViewSet

router = routers.DefaultRouter()
router.register(r'syndic', SyndicViewSet, basename='syndic')
router.register(r'copropriete', CoproprieteViewSet, basename='copropriete')
router.register(r'lot', LotViewSet, basename='lot')
router.register(r'coproprietaire', CoproprietaireViewSet, basename='coproprietaire')
router.register(r'documentcopro', DocumentCoproViewSet, basename='documentcopro')
router.register(r'document', DocumentViewSet, basename='document')


urlpatterns = [
    path('', include(router.urls)),
]




