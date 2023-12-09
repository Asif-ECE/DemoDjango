from .views import list_student, home, add_student, remove_student, addStudents
from django.urls import path

urlpatterns = [
    path('home/', home, name="home"),
    path('addStudent/', addStudents, name="addStudent"),
    # apis
    path('list-student/', list_student, name="list-student"),
    path('add-student/', add_student, name="add-student"),
    path('remove-students/', remove_student, name="remove-students"),
]
