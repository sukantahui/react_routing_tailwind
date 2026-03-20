package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

public class BodyTag extends SimpleTagSupport {
    private int count;

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public void doTag() throws JspException, IOException {
        for (int i = 0; i < count; i++) {
            getJspBody().invoke(null);
        }
    }
}