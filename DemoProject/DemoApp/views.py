from django.shortcuts import render, redirect
from .models import Student
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .forms import StudentForm


def home(request):
    students = Student.objects.all()
    content = {"students": students}
    return render(request, 'home.html', context=content)


def addStudents(request):
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = StudentForm()
    return render(request, 'addStudent.html', {'form': form})


# api_views
def list_student(request):
    students = Student.objects.all()
    data = [{"id": student.id, "name": student.name, "roll": student.roll}
            for student in students]
    print(data)
    return JsonResponse(data, safe=False)


@require_POST
@csrf_exempt
def add_student(request):
    try:
        data = json.loads(request.body)

        name = data.get('name')
        roll = data.get('roll')

        student = Student.objects.create(name=name, roll=roll)

        # Return a success response
        return JsonResponse({'message': 'Student added successfully', 'student_id': student.id})

    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_POST
@csrf_exempt
def remove_student(request):
    try:
        data = json.loads(request.body)

        listOfStudents = data.get('students')

        student = Student.objects.filter(id__in=listOfStudents).delete()

        # Return a success response
        return JsonResponse({'message': 'Student removed successfully'})

    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
