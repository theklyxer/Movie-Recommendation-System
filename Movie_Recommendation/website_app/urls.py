from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.members, name='members'),
    path('', views.landing,name='landing_page'),
    path('signup/', views.signup, name='signup_page'),
    path('signin/', views.signin, name='signin_page'),
    path('members1/', views.members1, name='members1'),
    path('search/', views.search, name='search'),

]