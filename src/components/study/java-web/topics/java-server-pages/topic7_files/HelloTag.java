package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

public class HelloTag extends SimpleTagSupport {
    @Override
    public void doTag() throws JspException, IOException {
        getJspContext().getOut().print("Hello from a custom tag!");
    }
}