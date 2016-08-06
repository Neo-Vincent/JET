# --*--coding= utf-8 --*--
# author: neo
# decription: tools for Python coding

def __function_generator__( m_class,code, attr_name=None):
    m_code = code.strip()
    fun_name = m_code[m_code.index("def") + 3:m_code.index("(")].strip()
    d = {}
    if attr_name is None:
        attr_name = fun_name
    exec(m_code, globals(), d)
    setattr(m_class, attr_name, d[fun_name])

def __setter_and_getter__(m_class, private_class_members, default_value=None):
    '''
    <p> __setter_and_getter__ </p>
    Usage: generator a set of getter and setter functions for private members,
    Notice the default value of private members is None if the second parameter is omitted.
    :param m_class: a class, the object class needed to private members
    :param private_class_members: a list of string, list of class members' name, generated attribute name will
            in a form of _membersName_
    :param default_value: optional, a list object for the private members default value,
            if some default value you don't wanna change, you can use None.
    :return: None

        >>> class myNewClass(object):
        >>>     _b_=0
        >>>     #class body
        >>> myPrivateMemberofMyNewClass=["a","b"]
        >>> defaultValues=[1,None]  # default value of b would not be changed, is still is 0
        >>> __setter_and_getter__(myNewClass,myPrivateMemberofMyNewClass,defaultValues)
        >>>
        >>> instance = myNewClass()
        >>> instance.get_a()
    '''
    setter_code = """
            def setter(self,obj):
                self.%s=obj
    """
    getter_code = """
            def getter(self):
                if not hasattr(self,"%s"):
                    return None
                return self.%s
    """
    if default_value is None:
        default_value = [None] * len(private_class_members)
    for i, default in zip(private_class_members, default_value):
        attr_name = "_" + i + "_"
        # initialization class members, if default value is not None
        if not hasattr(m_class,attr_name) and default is not None:
            setattr(m_class, attr_name, default)
        s_code = setter_code % (attr_name)
        g_code = getter_code % (attr_name, attr_name)
        __function_generator__(m_class,s_code, "set_" + i)
        __function_generator__(m_class,g_code, "get_" + i)


