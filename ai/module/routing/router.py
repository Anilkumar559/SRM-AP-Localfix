class DepartmentRouter:

    ROUTES = {
        "Electrical": "Electrical Department",
        "Plumbing": "Plumbing Department",
        "Maintenance": "Maintenance Department",
        "Sanitation": "Housekeeping Department",
        "IT": "IT Department",
        "Civil": "Civil / Infrastructure Department",
        "Other": "Campus Administration"
    }

    def route(self, category):
        return self.ROUTES.get(
            category,
            "Campus Administration"
        )


department_router = DepartmentRouter()