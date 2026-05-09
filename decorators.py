from django.shortcuts import redirect

def login_required_role(required_role):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if not request.session.get('email'):
                return redirect('login')

            if request.session.get('role') != required_role:
                return redirect('login')

            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator