from django.urls import path
from . import views

app_name = 'cms'

urlpatterns = [
    path('', views.index, name='index'),
    path('get_center_patient/', views.get_center_patient, name='get_center'),
    path('add_center_patient/', views.add_center_patient, name='add_center'),
    path('edit_center_patient/', views.edit_center_patient, name='edit_center'),
    path('delete_center_patient/', views.delete_center_patient, name='delete_center'),
    path('get_ondoor_patient/', views.get_ondoor_patient, name='get_ondoor'),
    path('add_ondoor_patient/', views.add_ondoor_patient, name='add_ondoor'),
    path('edit_ondoor_patient/', views.edit_ondoor_patient, name='edit_ondoor'),
    path('delete_ondoor_patient/', views.delete_ondoor_patient, name='delete_ondoor'),
    path('get_community_information/', views.get_community_information, name='get_community_information'),
    path('edit_community_information/', views.edit_community_information, name='edit_community_information'),
    path('get_url/', views.get_url, name='get_url'),
    path('upload_file/', views.upload_file, name='upload_file'),
    path('add_news/', views.add_institution_news, name='add_news'),
    path('get_all_news/', views.get_institution_news, name='get_all_news'),
    path('delete_news/', views.delete_institution_news, name='delete_news'),
]