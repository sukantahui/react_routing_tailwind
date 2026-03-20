package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

public class AttributeTag extends SimpleTagSupport {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void doTag() throws JspException, IOException {
        getJspContext().getOut().print("Hello, " + name + "!");
    }
}