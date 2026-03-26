package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import javax.servlet.jsp.tagext.JspFragment;
import java.io.IOException;

public class RepeatTag extends SimpleTagSupport {
    private int times;

    public void setTimes(int times) {
        this.times = times;
    }

    @Override
    public void doTag() throws JspException, IOException {
        for (int i = 0; i < times; i++) {
            // Invoke the fragment (body) once per iteration
            getJspBody().invoke(null);
        }
    }
}