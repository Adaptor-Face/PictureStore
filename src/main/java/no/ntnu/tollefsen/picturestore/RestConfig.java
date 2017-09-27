package no.ntnu.tollefsen.picturestore;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

/**
 *
 * @author mikael
 */
@ApplicationPath("api")
public class RestConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(MultiPartFeature.class);
        addRestResourceClasses(resources);
        return resources;
    }
    
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(no.ntnu.tollefsen.picturestore.AuthService.class);
        resources.add(no.ntnu.tollefsen.picturestore.ChatServices.class);
        resources.add(no.ntnu.tollefsen.picturestore.ForumServices.class);
        resources.add(no.ntnu.tollefsen.picturestore.PictureService.class);
    }
}
