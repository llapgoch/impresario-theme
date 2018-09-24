<div class="row">
    <!-- footer -->
        <?php if(false):?>
			<footer class="footer" role="contentinfo">

				<!-- copyright -->
				<p class="copyright">
					&copy; <?php  echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>.
				</p>
				<!-- /copyright -->

			</footer>
    <?php endif; ?>
</div>
			<!-- /footer -->

		</div>
		<!-- /wrapper -->

		<?php wp_footer(); ?>

    <?php echo do_shortcode('[root]');?>
	</body>
</html>